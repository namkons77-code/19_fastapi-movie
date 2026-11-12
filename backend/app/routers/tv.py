from fastapi import APIRouter
from app.services.tmdb import tmdb_service
import asyncio

router = APIRouter(prefix="/tv", tags=["TV Shows & Series"])

@router.get("/popular")
async def get_popular_tv():
    return await tmdb_service.get_popular_tv()

@router.get("/on-the-air")
async def get_on_the_air_tv():
    return await tmdb_service.get_on_the_air_tv()

@router.get("/genre/{genre_id}")
async def get_tv_by_genre(genre_id: int):
    return await tmdb_service.get_genre_content("tv", genre_id)

@router.get("/feed")
async def get_tv_page_feed():
    popular_task = tmdb_service.get_popular_tv()
    on_air_task = tmdb_service.get_on_the_air_tv()
    drama_task = tmdb_service.get_genre_content("tv", 18)
    romance_task = tmdb_service.get_genre_content("tv", 10749)
    reality_task = tmdb_service.get_genre_content("tv", 10764)
    mystery_task = tmdb_service.get_genre_content("tv", 9648)

    (
        popular,
        on_air,
        drama,
        romance,
        reality,
        mystery
    ) = await asyncio.gather(
        popular_task,
        on_air_task,
        drama_task,
        romance_task,
        reality_task,
        mystery_task,
        return_exceptions=True
    )

    def safe_list(val):
        return val if isinstance(val, list) else []

    hero_items = safe_list(popular)[:5] if safe_list(popular) else []

    sections = [
        {
            "id": "tv_top",
            "title": "실시간 인기 시리즈 TOP 20",
            "type": "ranking",
            "items": [
                {**item, "rank": idx + 1}
                for idx, item in enumerate(safe_list(popular)[:20])
            ]
        },
        {
            "id": "tv_on_air",
            "title": "지금 본방사수 중인 최신 시리즈",
            "type": "standard",
            "items": safe_list(on_air)
        },
        {
            "id": "tv_drama",
            "title": "몰입도 200% 명품 웰메이드 드라마",
            "type": "standard",
            "items": safe_list(drama)
        },
        {
            "id": "tv_romance",
            "title": "심쿵 유발 로맨스 & 연애 리얼리티",
            "type": "standard",
            "items": safe_list(romance)
        },
        {
            "id": "tv_reality",
            "title": "주말을 책임지는 화제의 예능 & 서바이벌",
            "type": "standard",
            "items": safe_list(reality)
        },
        {
            "id": "tv_mystery",
            "title": "진실을 파헤치는 미스터리 추리극",
            "type": "standard",
            "items": safe_list(mystery)
        }
    ]

    return {
        "hero_banners": hero_items,
        "sections": sections
    }
