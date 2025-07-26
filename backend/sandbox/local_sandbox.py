"""
Local Docker-based sandbox implementation
This provides the same interface as the Modal sandbox but uses local Docker containers
"""
import asyncio
import aiohttp
import docker
import tempfile
import shutil
import os
import uuid
import datetime
from typing import List, Optional, AsyncGenerator, Union
from pathlib import Path
from asyncio import Lock
from functools import lru_cache

from db.database import get_db
from db.models import Project, Stack


class SandboxNotReadyException(Exception):
    pass


@lru_cache()
def _get_project_lock(project_id: int) -> Lock:
    return Lock()


def _unique_id():
    return str(uuid.uuid4())


async def _is_url_up(url: str) -> bool:
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as response:
                return response.status < 500
    except Exception:
        return False


class LocalDevSandbox:
    """Local Docker-based sandbox that mimics Modal's DevSandbox interface"""
    
    def __init__(self, project_id: int, container, project_dir: str):
        self.project_id = project_id
        self.container = container
        self.project_dir = project_dir
        self.ready = False
        self.docker_client = docker.from_env()
        
    async def is_up(self):
        """Check if the development server is running"""
        try:
            # Check if container is running
            self.container.reload()
            if self.container.status != 'running':
                return False
                
            # Check if port 3000 is accessible
            return await _is_url_up("http://localhost:3000")
        except Exception:
            return False

    async def wait_for_up(self):
        """Wait for the development server to be ready"""
        max_attempts = 60  # 60 seconds timeout
        for attempt in range(max_attempts):
            if await self.is_up():
                self.ready = True
                return
            await asyncio.sleep(1)
        raise SandboxNotReadyException("Sandbox failed to start within timeout")

    async def get_file_paths(self) -> List[str]:
        """Get list of all files in the project"""
        paths = []
        ignore_dirs = {'.git', 'node_modules', '.next', 'build', 'tmp'}
        
        for root, dirs, files in os.walk(self.project_dir):
            # Remove ignored directories from dirs list to prevent walking into them
            dirs[:] = [d for d in dirs if d not in ignore_dirs]
            
            for file in files:
                if file != 'git.log':
                    rel_path = os.path.relpath(os.path.join(root, file), self.project_dir)
                    paths.append(f"/app/{rel_path.replace(os.sep, '/')}")
        
        return sorted(paths)

    async def run_command(self, command: str, workdir: Optional[str] = None) -> str:
        """Execute a command in the container"""
        try:
            workdir = workdir or "/app"
            result = self.container.exec_run(
                f"sh -c '{command}'",
                workdir=workdir,
                demux=True
            )
            stdout, stderr = result.output
            output = ""
            if stdout:
                output += stdout.decode('utf-8')
            if stderr:
                output += stderr.decode('utf-8')
            return output
        except Exception as e:
            return f"Error: {e}"

    async def run_command_stream(
        self, command: str, workdir: Optional[str] = None
    ) -> AsyncGenerator[str, None]:
        """Stream command output (simplified implementation)"""
        result = await self.run_command(command, workdir)
        yield result

    async def commit_changes(self, commit_message: str):
        """Commit changes to git"""
        await self.run_command(f"git add -A && git commit -m {repr(commit_message)}")
        await self.run_command(
            'git log --pretty="%h|%s|%aN|%aE|%aD" -n 50 > /app/git.log'
        )

    async def read_file_contents(
        self, path: str, does_not_exist_ok: bool = False
    ) -> str:
        """Read file contents from the local project directory"""
        # Convert /app/ path to local path
        if path.startswith("/app/"):
            local_path = os.path.join(self.project_dir, path[5:])
        else:
            local_path = os.path.join(self.project_dir, path)
            
        try:
            with open(local_path, 'r', encoding='utf-8') as f:
                return f.read()
        except FileNotFoundError:
            if does_not_exist_ok:
                return ""
            raise

    async def has_file(self, path: str) -> bool:
        """Check if file exists"""
        if path.startswith("/app/"):
            local_path = os.path.join(self.project_dir, path[5:])
        else:
            local_path = os.path.join(self.project_dir, path)
        return os.path.exists(local_path)

    async def stream_file_contents(
        self, path: str, binary_mode: bool = False
    ) -> AsyncGenerator[Union[str, bytes], None]:
        """Stream file contents"""
        if path.startswith("/app/"):
            local_path = os.path.join(self.project_dir, path[5:])
        else:
            local_path = os.path.join(self.project_dir, path)
            
        try:
            mode = 'rb' if binary_mode else 'r'
            encoding = None if binary_mode else 'utf-8'
            with open(local_path, mode, encoding=encoding) as f:
                while True:
                    chunk = f.read(8192)
                    if not chunk:
                        break
                    yield chunk
        except FileNotFoundError as e:
            raise e

    async def write_file(self, path: str, content: str):
        """Write file to the local project directory and container"""
        # Write to local directory
        if path.startswith("/app/"):
            local_path = os.path.join(self.project_dir, path[5:])
        else:
            local_path = os.path.join(self.project_dir, path)
            
        os.makedirs(os.path.dirname(local_path), exist_ok=True)
        with open(local_path, 'w', encoding='utf-8') as f:
            f.write(content)
            
        # Also write to container if it's running
        try:
            if self.container.status == 'running':
                # Create a temporary file and copy it to the container
                with tempfile.NamedTemporaryFile(mode='w', delete=False, encoding='utf-8') as tmp:
                    tmp.write(content)
                    tmp_path = tmp.name
                
                # Copy file to container
                with open(tmp_path, 'rb') as f:
                    self.container.put_archive(os.path.dirname(path), f.read())
                
                os.unlink(tmp_path)
        except Exception as e:
            print(f"Warning: Could not sync file to container: {e}")

    @classmethod
    async def terminate_project_resources(cls, project: Project):
        """Terminate project resources (stop and remove container)"""
        if hasattr(project, 'local_container_id') and project.local_container_id:
            try:
                client = docker.from_env()
                container = client.containers.get(project.local_container_id)
                container.stop()
                container.remove()
            except Exception as e:
                print(f"Error terminating container: {e}")

    @classmethod
    async def get_project_file_contents(
        cls, project: Project, path: str
    ) -> Optional[bytes]:
        """Get file contents from project directory"""
        if hasattr(project, 'local_project_dir') and project.local_project_dir:
            if path.startswith("/app/"):
                local_path = os.path.join(project.local_project_dir, path[5:])
            else:
                local_path = os.path.join(project.local_project_dir, path)
                
            try:
                with open(local_path, 'rb') as f:
                    return f.read()
            except FileNotFoundError:
                return None
        return None

    @classmethod
    async def write_project_file(
        cls, project: Project, path: str, content: str
    ) -> None:
        """Write file to project directory"""
        if hasattr(project, 'local_project_dir') and project.local_project_dir:
            if path.startswith("/app/"):
                local_path = os.path.join(project.local_project_dir, path[5:])
            else:
                local_path = os.path.join(project.local_project_dir, path)
                
            os.makedirs(os.path.dirname(local_path), exist_ok=True)
            with open(local_path, 'w', encoding='utf-8') as f:
                f.write(content)

    @classmethod
    async def destroy_project_resources(cls, project: Project):
        """Clean up all project resources"""
        # Stop and remove container
        await cls.terminate_project_resources(project)
        
        # Clean up project directory
        if hasattr(project, 'local_project_dir') and project.local_project_dir:
            try:
                if os.path.exists(project.local_project_dir):
                    shutil.rmtree(project.local_project_dir)
            except Exception as e:
                print(f"Error cleaning up project directory: {e}")

    @classmethod
    async def get_or_create(
        cls, project_id: int, create_if_missing: bool = True
    ) -> "LocalDevSandbox":
        """Get or create a local sandbox for the project"""
        lock = _get_project_lock(project_id)
        try:
            await lock.acquire()
            db = next(get_db())
            project = db.query(Project).filter(Project.id == project_id).first()
            stack = db.query(Stack).filter(Stack.id == project.stack_id).first()
            
            if not project or not stack:
                raise SandboxNotReadyException(
                    f"Project or stack not found (project={project_id})"
                )

            # Create project directory if it doesn't exist
            if not hasattr(project, 'local_project_dir') or not project.local_project_dir:
                projects_dir = os.path.join(tempfile.gettempdir(), 'sparkstack_projects')
                os.makedirs(projects_dir, exist_ok=True)
                project_dir = os.path.join(projects_dir, f"project_{project_id}")
                
                # Store in database (you may need to add this column to the Project model)
                project.local_project_dir = project_dir
                db.commit()
            else:
                project_dir = project.local_project_dir

            # Ensure project directory exists
            os.makedirs(project_dir, exist_ok=True)

            # Check if container is running
            container = None
            if hasattr(project, 'local_container_id') and project.local_container_id:
                try:
                    client = docker.from_env()
                    container = client.containers.get(project.local_container_id)
                    container.reload()
                    if container.status != 'running':
                        container = None
                except Exception:
                    container = None

            # Create new container if needed
            if not container and create_if_missing:
                if not create_if_missing:
                    raise SandboxNotReadyException(
                        f"Sandbox is not ready for project (project={project_id})"
                    )
                
                print(f"Creating new local container for project {project_id}")
                
                # Initialize project with stack template if directory is empty
                if not os.listdir(project_dir):
                    await cls._initialize_project_from_stack(project_dir, stack)
                
                # Create and start container
                client = docker.from_env()
                
                # Use Node.js image for most stacks
                image = "node:18-alpine"
                
                container = client.containers.run(
                    image,
                    command="sh -c 'cd /app && npm install && npm run dev'",
                    volumes={project_dir: {'bind': '/app', 'mode': 'rw'}},
                    ports={'3000/tcp': 3000},
                    working_dir='/app',
                    detach=True,
                    remove=False,
                    name=f"sparkstack_project_{project_id}_{_unique_id()[:8]}"
                )
                
                project.local_container_id = container.id
                db.commit()
                
                print(f"Created container {container.id} for project {project_id}")

            return cls(project_id, container, project_dir)
            
        finally:
            lock.release()

    @classmethod
    async def _initialize_project_from_stack(cls, project_dir: str, stack: Stack):
        """Initialize project directory with stack template"""
        # Create a basic Next.js project structure
        # This is a simplified version - you can expand this based on your stack templates
        
        package_json = {
            "name": f"sparkstack-project",
            "version": "0.1.0",
            "private": True,
            "scripts": {
                "dev": "next dev",
                "build": "next build",
                "start": "next start",
                "lint": "next lint"
            },
            "dependencies": {
                "next": "14.0.0",
                "react": "^18",
                "react-dom": "^18"
            },
            "devDependencies": {
                "eslint": "^8",
                "eslint-config-next": "14.0.0"
            }
        }
        
        # Write package.json
        import json
        with open(os.path.join(project_dir, 'package.json'), 'w') as f:
            json.dump(package_json, f, indent=2)
        
        # Create basic Next.js structure
        os.makedirs(os.path.join(project_dir, 'pages'), exist_ok=True)
        os.makedirs(os.path.join(project_dir, 'public'), exist_ok=True)
        
        # Create basic index page
        index_content = '''export default function Home() {
  return (
    <div>
      <h1>Welcome to SparkStack</h1>
      <p>Your project is ready!</p>
    </div>
  )
}'''
        
        with open(os.path.join(project_dir, 'pages', 'index.js'), 'w') as f:
            f.write(index_content)
        
        # Initialize git repository
        import subprocess
        try:
            subprocess.run(['git', 'init'], cwd=project_dir, check=True, capture_output=True)
            subprocess.run(['git', 'add', '.'], cwd=project_dir, check=True, capture_output=True)
            subprocess.run(['git', 'commit', '-m', 'Initial commit'], cwd=project_dir, check=True, capture_output=True)
        except subprocess.CalledProcessError:
            print("Warning: Could not initialize git repository")

    @classmethod
    async def prepare_sandbox(cls, stack: Stack):
        """Prepare a sandbox (not needed for local implementation)"""
        # For local implementation, we don't need to prepare sandboxes
        # Return dummy values to maintain interface compatibility
        return None, f"local-{_unique_id()}"