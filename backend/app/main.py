from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import media_router, movies_router, tv_router, live_router
from app.services.tmdb import tmdb_service

app = FastAPI(
    title="Media Streaming API",
    description="TMDB 기반 미디어 스트리밍 백엔드 서비스",
    version="1.0.0"
)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록
app.include_router(media_router, prefix="/api")
app.include_router(movies_router, prefix="/api")
app.include_router(tv_router, prefix="/api")
app.include_router(live_router, prefix="/api")

@app.get("/")
async def root():
    return {
        "service": "Media Streaming Backend API",
        "status": "online",
        "tmdb_connected": tmdb_service.has_credentials(),
        "docs_url": "/docs"
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "has_tmdb_key": bool(settings.TMDB_API_KEY),
        "has_tmdb_secret": bool(settings.TMDB_SECRET_KEY or settings.TMDB_ACCESS_TOKEN)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
