from .media import router as media_router
from .movies import router as movies_router
from .tv import router as tv_router
from .live import router as live_router

__all__ = ["media_router", "movies_router", "tv_router", "live_router"]
