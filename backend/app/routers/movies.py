from fastapi import APIRouter
from app.services.tmdb import tmdb_service
import asyncio

router = APIRouter(prefix="/movies", tags=["Movies"])

@router.get("/popular")
async def get_popular_movies():
    return await tmdb_service.get_popular_movies()

@router.get("/now-playing")
async def get_now_playing_movies():
    return await tmdb_service.get_now_playing_movies()

@router.get("/genre/{genre_id}")
async def get_movies_by_genre(genre_id: int):
    return await tmdb_service.get_genre_content("movie", genre_id)

@router.get("/feed")
async def get_movies_page_feed():
    popular_task = tmdb_service.get_popular_movies()
    now_task = tmdb_service.get_now_playing_movies()
    action_task = tmdb_service.get_genre_content("movie", 28)
    sf_task = tmdb_service.get_genre_content("movie", 878)
    thriller_task = tmdb_service.get_genre_content("movie", 53)
    comedy_task = tmdb_service.get_genre_content("movie", 35)

    (
        popular,
        now_playing,
        action,
        sf,
        thriller,
        comedy
    ) = await asyncio.gather(
        popular_task,
        now_task,
        action_task,
        sf_task,
        thriller_task,
        comedy_task,
        return_exceptions=True
    )

    def safe_list(val):
        return val if isinstance(val, list) else []

    hero_items = safe_list(popular)[:5] if safe_list(popular) else []

    sections = [
        {
            "id": "movie_top",
            "title": "현재 가장 사랑받는 영화 TOP 20",
            "type": "ranking",
            "items": [
                {**item, "rank": idx + 1}
                for idx, item in enumerate(safe_list(popular)[:20])
            ]
        },
        {
            "id": "movie_now",
            "title": "극장에서 바로 온 최신 개봉작",
            "type": "standard",
            "items": safe_list(now_playing)
        },
        {
            "id": "movie_action",
            "title": "짜릿한 액션 블록버스터",
            "type": "standard",
            "items": safe_list(action)
        },
        {
            "id": "movie_sf",
            "title": "광활한 상상력의 SF & 판타지",
            "type": "standard",
            "items": safe_list(sf)
        },
        {
            "id": "movie_thriller",
            "title": "심장을 조여오는 서스펜스 스릴러",
            "type": "standard",
            "items": safe_list(thriller)
        },
        {
            "id": "movie_comedy",
            "title": "유쾌하게 웃고 싶을 때 보는 코미디",
            "type": "standard",
            "items": safe_list(comedy)
        }
    ]

    return {
        "hero_banners": hero_items,
        "sections": sections
    }
