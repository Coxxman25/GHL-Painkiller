#!/usr/bin/env python3
"""
Local setup script for SparkStack development without Modal
"""
import os
import sys
import subprocess
from pathlib import Path

def check_requirements():
    """Check if required dependencies are available"""
    print("🔍 Checking requirements...")
    
    # Check Docker
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        if result.returncode == 0:
            print("✅ Docker is available")
        else:
            print("❌ Docker is not available")
            return False
    except FileNotFoundError:
        print("❌ Docker is not installed")
        return False
    
    # Check Python packages
    try:
        import docker
        print("✅ Docker Python package is available")
    except ImportError:
        print("❌ Docker Python package not found. Installing...")
        subprocess.run([sys.executable, '-m', 'pip', 'install', 'docker'])
    
    return True

def setup_database():
    """Set up the local database"""
    print("🗄️  Setting up local database...")
    
    # Create database directory
    db_dir = Path("./db_local")
    db_dir.mkdir(exist_ok=True)
    
    # Run migrations
    try:
        subprocess.run(['alembic', 'upgrade', 'head'], check=True)
        print("✅ Database migrations completed")
    except subprocess.CalledProcessError as e:
        print(f"❌ Database migration failed: {e}")
        return False
    
    return True

def create_env_file():
    """Create .env file if it doesn't exist"""
    env_file = Path(".env")
    env_local_file = Path(".env.local")
    
    if not env_file.exists() and env_local_file.exists():
        print("📝 Creating .env file from .env.local template...")
        import shutil
        shutil.copy(env_local_file, env_file)
        print("✅ .env file created")
        print("⚠️  Please edit .env file and add your API keys")
        return False
    elif not env_file.exists():
        print("❌ No .env file found. Please create one with your API keys.")
        return False
    
    return True

def main():
    """Main setup function"""
    print("🚀 Setting up SparkStack for local development...")
    
    if not check_requirements():
        print("❌ Requirements check failed")
        return False
    
    if not create_env_file():
        print("❌ Environment setup incomplete")
        return False
    
    if not setup_database():
        print("❌ Database setup failed")
        return False
    
    print("✅ Local setup completed successfully!")
    print("\n📋 Next steps:")
    print("1. Edit .env file and add your AI provider API key")
    print("2. Run: python main.py")
    print("3. In another terminal, run: cd ../frontend && npm install && npm run dev")
    print("\n🌐 Your app will be available at http://localhost:3000")
    
    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)