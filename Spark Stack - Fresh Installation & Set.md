# Spark Stack - Fresh Installation & Setup Guide

## 🎯 Purpose
This guide provides step-by-step instructions for setting up Spark Stack from a fresh download, including all known issues and their solutions.

## 📋 Pre-Setup Checklist

### Required Accounts & Services:
- [ ] **Modal Account** (Optional - for cloud sandboxes)
  - Sign up at modal.com
  - Generate API token if you want cloud sandboxes
  - If skipped, system will use local Docker (works fine)

- [ ] **AWS Account** (Required)
  - Create S3 bucket for file storage
  - Generate access keys

- [ ] **AI Provider** (Required - choose one or both):
  - OpenAI API key, OR
  - Anthropic API key

- [ ] **Database** (Required):
  - PostgreSQL instance (local or cloud)

### Optional Services:
- [ ] Stripe (for payments)
- [ ] Postmark (for emails)
- [ ] Unsplash (for images)

## 🚨 CRITICAL FIXES REQUIRED IMMEDIATELY

After downloading fresh code, you MUST fix these import issues before running:

### 1. Fix `backend/agents/agent.py`
**Location:** Line 8
```python
# ❌ BROKEN (will cause AuthError)
from sandbox.sandbox import DevSandbox

# ✅ REPLACE WITH
from sandbox.sandbox_factory import DevSandbox
```

### 2. Fix `backend/agents/diff.py`
**Location:** Line 7-8
```python
# ❌ BROKEN (will cause AuthError)
from sandbox.sandbox import DevSandbox

# ✅ REPLACE WITH
from sandbox.sandbox_factory import DevSandbox
```

### 3. Fix `backend/routers/projects.py`
**Location:** Lines 44-51 (conditional import block)
```python
# ❌ BROKEN (will cause AuthError)
try:
    from sandbox.sandbox import DevSandbox
except ImportError:
    DevSandbox = None

# ✅ REPLACE WITH
from sandbox.sandbox_factory import DevSandbox, MODAL_AVAILABLE
```

### 4. Check `backend/routers/project_socket.py`
**Potential Issue:** File may be corrupted with duplicate import blocks
**Solution:** If file is longer than ~400 lines or has duplicate imports, extract only the first ~347 lines

## 🔧 Environment Configuration

Create `backend/.env` file:

```env
# Database (Required)
DATABASE_URL=postgresql://username:password@localhost:5432/sparkstack

# AWS (Required)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
BUCKET_NAME=your-s3-bucket-name

# AI Provider (Required - choose one or both)
ANTHROPIC_API_KEY=your_anthropic_key
OPENAI_API_KEY=your_openai_key

# AI Configuration
FAST_PROVIDER=anthropic
MAIN_PROVIDER=anthropic
FAST_MODEL=claude-3-5-haiku-20241022
MAIN_MODEL=claude-3-7-sonnet-20250219

# Modal (Optional - leave empty to use local Docker)
MODAL_TOKEN_ID=your_modal_token_id
MODAL_TOKEN_SECRET=your_modal_token_secret
MODAL_APP_NAME=prompt-stack-sandbox

# Security
JWT_SECRET_KEY=your_random_secret_key_here

# Optional Services
STRIPE_SECRET_KEY=your_stripe_key
POSTMARK_API_KEY=your_postmark_key
UNSPLASH_ACCESS_KEY=your_unsplash_key
FRONTEND_URL=http://localhost:3000
```

## 🚀 Installation Steps

### 1. Backend Setup
```bash
cd spark-stack-main/backend
pip install -r requirements.txt

# Set up database
alembic upgrade head

# Start backend
python main.py
```

### 2. Frontend Setup
```bash
cd spark-stack-main/frontend
npm install
npm run dev
```

## 🔍 Verification Steps

### Test 1: Check Import Fixes
Run this command to verify no broken imports remain:
```bash
cd backend
grep -r "from sandbox.sandbox import" . --exclude-dir=__pycache__
```
**Expected Result:** Should only show `sandbox/sandbox_factory.py` (this is correct)

### Test 2: Start Backend
```bash
cd backend
python main.py
```
**Expected Result:** No `AuthError` exceptions, server starts successfully

### Test 3: Test Sandbox Creation
- Create a new project in the UI
- Verify sandbox starts (either Modal or local Docker)
- Check for any authentication errors

## 🐛 Common Issues & Solutions

### Issue: `modal.exception.AuthError: Token missing`
**Cause:** Files importing directly from `sandbox.sandbox` instead of `sandbox.sandbox_factory`
**Solution:** Apply the 4 import fixes listed above

### Issue: File corruption in `project_socket.py`
**Symptoms:** File has 1000+ lines with duplicate imports
**Solution:** Extract clean content (first ~347 lines) and recreate file

### Issue: Database connection errors
**Solution:** Verify PostgreSQL is running and DATABASE_URL is correct

### Issue: AWS/S3 errors
**Solution:** Verify AWS credentials and bucket exists

## 🏗️ Architecture Overview

### Sandbox System:
- **Modal Mode:** Cloud-based sandboxes (requires Modal token)
- **Local Mode:** Docker-based sandboxes (fallback, no token needed)
- **Factory Pattern:** `sandbox_factory.py` automatically chooses based on token availability

### Key Components:
- **Backend:** FastAPI application with WebSocket support
- **Frontend:** Next.js React application
- **Database:** PostgreSQL with Alembic migrations
- **Storage:** AWS S3 for file storage
- **AI:** OpenAI/Anthropic for code generation

## ✅ Success Criteria

You'll know everything is working when:
- [ ] Backend starts without AuthError
- [ ] Frontend loads successfully
- [ ] Can create new projects
- [ ] AI chat responds to prompts
- [ ] Sandbox environments start properly
- [ ] Real-time preview works

## 🆘 If You Get Stuck

### Quick Diagnostic Commands:
```bash
# Check for remaining broken imports
grep -r "from sandbox.sandbox import" backend/ --exclude-dir=__pycache__

# Verify environment variables
python -c "import os; print('Modal token:', bool(os.getenv('MODAL_TOKEN_ID')))"

# Test database connection
python -c "from backend.config import DATABASE_URL; print('DB URL set:', bool(DATABASE_URL))"
```

### Most Common Fix:
90% of issues are solved by fixing the 4 import statements listed in the "CRITICAL FIXES" section above.

---

**💡 Pro Tip:** The import fixes are the most critical step. Everything else will likely work once those are corrected!