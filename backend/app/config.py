import os
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "Media Streaming API Service"
    API_V1_STR: str = "/api"
    
    # TMDB API Credentials (.env에서 로드)
    # TMDB v3 API Key (32자리)
    TMDB_API_KEY: str = ""
    # TMDB v4 Read Access Token (Secret Key 역할)
    TMDB_SECRET_KEY: str = ""
    TMDB_ACCESS_TOKEN: str = ""
    
    TMDB_BASE_URL: str = "https://api.themoviedb.org/3"
    TMDB_IMAGE_BASE_URL: str = "https://image.tmdb.org/t/p"
    
    # CORS 허용 오리진
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "*"
    ]
    
    class Config:
        env_file = [".env", "../.env"]
        env_file_encoding = "utf-8"
        extra = "ignore"

settings = Settings()
