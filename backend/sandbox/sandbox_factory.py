"""
Sandbox Factory - Automatically chooses between Modal and Local Docker implementations
"""
import os
from typing import Optional, TYPE_CHECKING

# Check if Modal tokens are available
MODAL_TOKEN_ID = os.getenv("MODAL_TOKEN_ID")
MODAL_TOKEN_SECRET = os.getenv("MODAL_TOKEN_SECRET")
MODAL_AVAILABLE = bool(MODAL_TOKEN_ID and MODAL_TOKEN_SECRET)

if TYPE_CHECKING:
    from .sandbox import DevSandbox as ModalDevSandbox
    from .local_sandbox import LocalDevSandbox

# Import the appropriate implementation
if MODAL_AVAILABLE:
    try:
        from .sandbox import DevSandbox
        print("✅ Modal tokens found - Using Modal sandbox implementation")
    except ImportError as e:
        print(f"❌ Modal import failed: {e}")
        print("🔄 Falling back to local Docker implementation")
        from .local_sandbox import LocalDevSandbox as DevSandbox
        MODAL_AVAILABLE = False
else:
    print("ℹ️  No Modal tokens found - Using local Docker implementation")
    from .local_sandbox import LocalDevSandbox as DevSandbox

# Export the chosen implementation
__all__ = ["DevSandbox", "MODAL_AVAILABLE"]