# Spark Stack - Local Development Setup Guide

## 🎯 Overview

This guide provides comprehensive instructions for setting up Spark Stack for local development. Spark Stack is an AI-powered web development platform that creates isolated sandbox environments for building applications.

## 📋 Prerequisites

- **Python 3.8+** (Python 3.13 recommended)
- **Node.js 18+** and npm
- **Git**
- **Docker** (optional but recommended for full sandbox functionality)

## 🚀 Quick Start

### 1. Clone and Navigate
```bash
git clone <repository-url>
cd spark-stack-main
```

### 2. Backend Setup
```bash
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Copy environment configuration
copy .env.local .env

# The application will automatically create the SQLite database
```

### 3. Frontend Setup
```bash
cd ../frontend

# Install Node.js dependencies (use legacy peer deps to resolve conflicts)
npm install --legacy-peer-deps
```

### 4. Start the Application
```bash
# Terminal 1: Start Backend (from backend directory)
python main.py

# Terminal 2: Start Frontend (from frontend directory)
npm run dev
```

### 5. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000

## 🔧 Critical Fixes Applied

### Import System Overhaul
**Problem**: The original codebase had import conflicts between Modal cloud services and local development.

**Solution**: Created a unified sandbox factory system:

#### Files Modified:
- `backend/sandbox/sandbox_factory.py` - New factory pattern for sandbox selection
- `backend/sandbox/local_sandbox.py` - Local Docker-based sandbox implementation
- `backend/agents/agent.py` - Updated imports
- `backend/routers/diff.py` - Updated imports  
- `backend/routers/projects.py` - Updated imports
- `backend/routers/chats.py` - Updated imports
- `backend/tasks/tasks.py` - Updated imports
- `backend/routers/project_socket.py` - Updated imports

#### Key Changes:
```python
# OLD (problematic)
from sandbox.sandbox import DevSandbox

# NEW (working)
from sandbox.sandbox_factory import DevSandbox
```

### Database Compatibility Fix
**Problem**: PostgreSQL-specific ARRAY types caused SQLite compatibility issues.

**Solution**: Replaced ARRAY types with JSON serialization:

#### Files Modified:
- `backend/db/models.py` - Changed `ARRAY(String)` to `Text` for images field
- `backend/routers/project_socket.py` - Added JSON serialization/deserialization

#### Key Changes:
```python
# Database Model (models.py)
# OLD: images = Column(ARRAY(String), nullable=True)
# NEW: images = Column(Text, nullable=True)  # JSON string for SQLite compatibility

# Conversion Functions (project_socket.py)
def _message_to_db_message(message: ChatMessage, chat_id: int) -> DbChatMessage:
    return DbChatMessage(
        role=message.role,
        content=message.content,
        images=json.dumps(message.images) if message.images else None,  # Serialize to JSON
        chat_id=chat_id,
    )

def _db_message_to_message(db_message: DbChatMessage) -> ChatMessage:
    return ChatMessage(
        id=db_message.id,
        role=db_message.role,
        content=db_message.content,
        images=json.loads(db_message.images) if db_message.images else None,  # Deserialize from JSON
    )
```

### Environment Configuration
**Problem**: Environment variables weren't loading automatically.

**Solution**: Added python-dotenv integration:

#### Files Modified:
- `backend/requirements.txt` - Added `python-dotenv==1.0.1`
- `backend/config.py` - Added automatic .env loading

#### Key Changes:
```python
# config.py
from dotenv import load_dotenv
load_dotenv()  # Load environment variables from .env file
```

### Dependency Management
**Problem**: Missing dependencies and version conflicts.

**Solution**: Updated requirements and resolved conflicts:

#### Backend Dependencies Added:
- `docker==7.1.0` - For local sandbox functionality
- `aiohttp==3.10.11` - For async HTTP operations
- `python-dotenv==1.0.1` - For environment variable loading

#### Frontend Dependencies:
- Installed with `--legacy-peer-deps` flag to resolve React version conflicts

## 📁 Project Structure

```
spark-stack-main/
├── backend/                    # Python FastAPI backend
│   ├── agents/                # AI agent implementations
│   ├── db/                    # Database models and configuration
│   ├── routers/               # API route handlers
│   ├── sandbox/               # Sandbox management (Modal + Local)
│   ├── tasks/                 # Background tasks
│   ├── utils/                 # Utility functions
│   ├── main.py               # FastAPI application entry point
│   ├── config.py             # Configuration management
│   ├── requirements.txt      # Python dependencies
│   └── .env                  # Environment variables
├── frontend/                  # Next.js React frontend
│   ├── src/                  # Source code
│   │   ├── app/              # Next.js app router pages
│   │   ├── components/       # React components
│   │   ├── context/          # React context providers
│   │   ├── hooks/            # Custom React hooks
│   │   └── lib/              # Utility libraries
│   ├── public/               # Static assets
│   └── package.json          # Node.js dependencies
└── images/                   # Docker images for different stacks
```

## 🔄 How the System Works

### Sandbox Architecture
The system uses a factory pattern to choose between cloud (Modal) and local (Docker) sandboxes:

1. **Environment Detection**: Checks for `MODAL_TOKEN_ID` and `MODAL_TOKEN_SECRET`
2. **Automatic Fallback**: Uses local Docker implementation when Modal tokens are missing
3. **Unified Interface**: Both implementations provide the same `DevSandbox` interface

### Local Development Flow
1. **Frontend** (Next.js) serves the user interface on port 3000
2. **Backend** (FastAPI) provides API endpoints on port 8000
3. **Database** (SQLite) stores projects, chats, and user data locally
4. **Sandboxes** (Docker) create isolated environments for each project

### Key Components

#### Backend (`backend/`)
- **`main.py`**: FastAPI application with CORS, routers, and startup tasks
- **`sandbox/sandbox_factory.py`**: Intelligent sandbox selection logic
- **`sandbox/local_sandbox.py`**: Docker-based local sandbox implementation
- **`db/models.py`**: SQLAlchemy models with SQLite compatibility
- **`agents/agent.py`**: AI agent for code generation and project management

#### Frontend (`frontend/`)
- **Next.js 15**: Modern React framework with app router
- **Tailwind CSS**: Utility-first CSS framework
- **WebSocket Integration**: Real-time communication with backend
- **Monaco Editor**: Code editing capabilities

## 🐳 Docker Integration (Optional)

While Docker is not required to run the application, it enables full sandbox functionality:

### What Docker Provides:
- Isolated project environments
- Package installation and management
- File system operations
- Command execution in sandboxes

### Without Docker:
- Core application functionality works
- Project creation and chat features available
- Sandbox-dependent features will show "booting" status

## 🔧 Configuration Files

### Backend Configuration (`.env`)
```env
DATABASE_URL=sqlite:///./sparkstack_local.db
SECRET_KEY=your-secret-key-here
ANTHROPIC_API_KEY=your-anthropic-key-here
OPENAI_API_KEY=your-openai-key-here
```

### Frontend Configuration
The frontend automatically connects to the backend on `localhost:8000`.

## 🚨 Troubleshooting

### Common Issues and Solutions

#### 1. Import Errors
**Error**: `ModuleNotFoundError: No module named 'sandbox.sandbox'`
**Solution**: Ensure all imports use `sandbox.sandbox_factory` instead of `sandbox.sandbox`

#### 2. Database Errors
**Error**: `sqlalchemy.exc.CompileError: can't render element of type ARRAY`
**Solution**: Verify that `db/models.py` uses `Text` fields instead of `ARRAY` types

#### 3. Environment Variables Not Loading
**Error**: `DATABASE_URL` is empty or None
**Solution**: Ensure `python-dotenv` is installed and `load_dotenv()` is called in `config.py`

#### 4. Frontend Dependency Conflicts
**Error**: Peer dependency conflicts during npm install
**Solution**: Use `npm install --legacy-peer-deps`

#### 5. Port Conflicts
**Error**: Port already in use
**Solution**: 
- Backend: Change port in `main.py` (default: 8000)
- Frontend: Use `npm run dev -- -p 3001` for different port

## 🔄 Development Workflow

### Making Changes

1. **Backend Changes**:
   - Modify Python files in `backend/`
   - Server auto-reloads with FastAPI's development mode
   - Check logs in terminal for errors

2. **Frontend Changes**:
   - Modify files in `frontend/src/`
   - Next.js hot-reloads automatically
   - Check browser console for errors

3. **Database Changes**:
   - Modify models in `backend/db/models.py`
   - Create migration: `alembic revision --autogenerate -m "description"`
   - Apply migration: `alembic upgrade head`

### Testing

1. **Backend Testing**:
   ```bash
   cd backend
   python -m pytest
   ```

2. **Frontend Testing**:
   ```bash
   cd frontend
   npm test
   ```

## 📚 Additional Resources

### API Documentation
- Backend API docs: http://localhost:8000/docs (Swagger UI)
- Alternative docs: http://localhost:8000/redoc

### Key Technologies
- **Backend**: FastAPI, SQLAlchemy, Alembic, Docker SDK
- **Frontend**: Next.js, React, Tailwind CSS, Monaco Editor
- **Database**: SQLite (local), PostgreSQL (production)
- **AI**: Anthropic Claude, OpenAI GPT models

## 🎯 Next Steps

1. **Install Docker** for full sandbox functionality
2. **Configure AI API keys** in `.env` file
3. **Create your first project** through the web interface
4. **Explore the codebase** and start building features
5. **Set up production deployment** when ready

## 🤝 Contributing

When contributing to this project:

1. Follow the established import patterns (`sandbox.sandbox_factory`)
2. Maintain SQLite compatibility in database models
3. Test both with and without Docker
4. Update this documentation for significant changes
5. Ensure environment variables are properly handled

---

**Happy Coding!** 🚀

This setup provides a robust foundation for developing with Spark Stack locally. The system is designed to be developer-friendly while maintaining compatibility with both local and cloud deployment scenarios.