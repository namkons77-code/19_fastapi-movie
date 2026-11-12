from fastapi import APIRouter, Query, HTTPException
from app.services.tmdb import tmdb_service
import asyncio

router = APIRouter(prefix="/media", tags=["Media"])

@router.get("/hero-banners")
async def get_hero_banners():
    return await tmdb_service.get_hero_banners()

@router.get("/top20")
async def get_top20():
    return await tmdb_service.get_top20_ranking()

@router.get("/shortcuts")
async def get_shortcuts():
    """TMDB 기반 퀵 바로가기 12개 카테고리"""
    return await tmdb_service.get_shortcuts()

@router.get("/search")
async def search_media(query: str = Query(..., min_length=1, description="검색어")):
    return await tmdb_service.search(query)

@router.get("/details/{media_type}/{item_id}")
async def get_details(media_type: str, item_id: int):
    if media_type not in ["movie", "tv"]:
        raise HTTPException(status_code=400, detail="유효하지 않은 미디어 타입입니다.")
    details = await tmdb_service.get_details(media_type, item_id)
    if not details:
        raise HTTPException(status_code=404, detail="콘텐츠를 찾을 수 없습니다.")
    return details

@router.get("/home-feed")
async def get_home_feed():
    hero_task = tmdb_service.get_hero_banners()
    top20_task = tmdb_service.get_top20_ranking()
    pop_movies_task = tmdb_service.get_popular_movies()
    pop_tv_task = tmdb_service.get_popular_tv()
    action_task = tmdb_service.get_genre_content("movie", 28)
    romance_task = tmdb_service.get_genre_content("tv", 10749)
    animation_task = tmdb_service.get_genre_content("movie", 16)

    (
        hero,
        top20,
        pop_movies,
        pop_tv,
        action_movies,
        romance_tv,
        animation_movies
    ) = await asyncio.gather(
        hero_task,
        top20_task,
        pop_movies_task,
        pop_tv_task,
        action_task,
        romance_task,
        animation_task,
        return_exceptions=True
    )

    def safe_list(val):
        return val if isinstance(val, list) else []

    sections = [
        {
            "id": "top20",
            "title": "실시간 인기 TOP 20",
            "type": "ranking",
            "items": safe_list(top20)
        },
        {
            "id": "popular_movies",
            "title": "지금 가장 많이 본 영화",
            "type": "standard",
            "items": safe_list(pop_movies)
        },
        {
            "id": "popular_tv",
            "title": "놓치면 후회할 화제의 인기 시리즈",
            "type": "standard",
            "items": safe_list(pop_tv)
        },
        {
            "id": "action_movies",
            "title": "숨 멎는 서스펜스와 폭발적 액션",
            "type": "standard",
            "items": safe_list(action_movies)
        },
        {
            "id": "romance_tv",
            "title": "설레는 봄날의 로맨스 & 감동 드라마",
            "type": "standard",
            "items": safe_list(romance_tv)
        },
        {
            "id": "animation",
            "title": "모두가 사랑하는 애니메이션 컬렉션",
            "type": "standard",
            "items": safe_list(animation_movies)
        }
    ]

    return {
        "hero_banners": safe_list(hero),
        "sections": sections
    }
