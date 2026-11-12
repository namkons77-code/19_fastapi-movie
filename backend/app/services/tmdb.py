import httpx
import logging
from typing import Any, Dict, List, Optional
from app.config import settings
from app.services.mock_data import MOCK_BANNERS, MOCK_TOP20

logger = logging.getLogger(__name__)

GENRE_MAP = {
    28: "액션",
    12: "어드벤처",
    16: "애니메이션",
    35: "코미디",
    80: "범죄",
    99: "다큐멘터리",
    18: "드라마",
    10751: "가족",
    14: "판타지",
    36: "역사",
    27: "공포",
    10402: "음악",
    9648: "미스터리",
    10749: "로맨스",
    878: "SF",
    10770: "TV 영화",
    53: "스릴러",
    10752: "전쟁",
    37: "서부",
    10759: "액션 & 어드벤처",
    10762: "키즈",
    10763: "뉴스",
    10764: "리얼리티",
    10765: "SF & 판타지",
    10766: "소프",
    10767: "토크",
    10768: "전쟁 & 정치"
}

class TMDBService:
    def __init__(self):
        self.base_url = settings.TMDB_BASE_URL
        self.image_base_url = settings.TMDB_IMAGE_BASE_URL
        self.api_key = settings.TMDB_API_KEY
        self.access_token = settings.TMDB_ACCESS_TOKEN or settings.TMDB_SECRET_KEY

    def _get_headers(self) -> Dict[str, str]:
        headers = {
            "Accept": "application/json",
            "Content-Type": "application/json;charset=utf-8"
        }
        if self.access_token:
            headers["Authorization"] = f"Bearer {self.access_token}"
        return headers

    def _get_params(self, extra_params: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        params = {
            "language": "ko-KR",
            "region": "KR"
        }
        if self.api_key and not self.access_token:
            params["api_key"] = self.api_key
        if extra_params:
            params.update(extra_params)
        return params

    def has_credentials(self) -> bool:
        return bool(self.api_key or self.access_token)

    async def _fetch(self, endpoint: str, params: Optional[Dict[str, Any]] = None) -> Optional[Dict[str, Any]]:
        if not self.has_credentials():
            return None
        
        url = f"{self.base_url}/{endpoint.lstrip('/')}"
        headers = self._get_headers()
        request_params = self._get_params(params)

        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.get(url, headers=headers, params=request_params)
                if response.status_code == 200:
                    return response.json()
                else:
                    logger.warning(f"TMDB API error {response.status_code} for {endpoint}: {response.text}")
                    return None
        except Exception as e:
            logger.error(f"Error fetching from TMDB endpoint {endpoint}: {e}")
            return None

    def _format_item(self, item: Dict[str, Any], default_media_type: str = "movie") -> Dict[str, Any]:
        media_type = item.get("media_type") or default_media_type
        title = item.get("title") or item.get("name") or "제목 정보 없음"
        original_title = item.get("original_title") or item.get("original_name") or title
        release_date = item.get("release_date") or item.get("first_air_date") or ""

        genre_ids = item.get("genre_ids", [])
        genres = [GENRE_MAP.get(gid) for gid in genre_ids if gid in GENRE_MAP]
        if not genres and "genres" in item:
            genres = [g.get("name") for g in item.get("genres", [])]

        backdrop_path = item.get("backdrop_path")
        poster_path = item.get("poster_path")

        backdrop_url = f"{self.image_base_url}/original{backdrop_path}" if backdrop_path else None
        poster_url = f"{self.image_base_url}/w500{poster_path}" if poster_path else None

        vote_avg = round(item.get("vote_average", 0), 1)

        return {
            "id": item.get("id"),
            "title": title,
            "original_title": original_title,
            "overview": item.get("overview") or "제공된 줄거리가 없습니다.",
            "backdrop_path": backdrop_path,
            "backdrop_url": backdrop_url,
            "poster_path": poster_path,
            "poster_url": poster_url,
            "media_type": media_type,
            "vote_average": vote_avg,
            "release_date": release_date,
            "genres": genres[:3] if genres else ["인기 콘텐츠"],
            "popularity": item.get("popularity", 0),
            "age_rating": "15+" if vote_avg > 7 else "12+",
            "badge": "독점작" if vote_avg >= 8.2 else ("인기" if vote_avg >= 7.5 else "추천")
        }

    async def get_hero_banners(self) -> List[Dict[str, Any]]:
        data = await self._fetch("trending/all/day")
        if data and "results" in data and len(data["results"]) > 0:
            results = [
                self._format_item(item, item.get("media_type", "movie"))
                for item in data["results"]
                if item.get("backdrop_path")
            ]
            if len(results) >= 5:
                return results[:6]
        
        # Fallback
        return [
            {
                **item,
                "backdrop_url": f"{self.image_base_url}/original{item['backdrop_path']}",
                "poster_url": f"{self.image_base_url}/w500{item['poster_path']}"
            }
            for item in MOCK_BANNERS
        ]

    async def get_top20_ranking(self) -> List[Dict[str, Any]]:
        data = await self._fetch("trending/all/week")
        if data and "results" in data and len(data["results"]) > 0:
            formatted = []
            for rank, item in enumerate(data["results"][:20], 1):
                f_item = self._format_item(item, item.get("media_type", "movie"))
                f_item["rank"] = rank
                formatted.append(f_item)
            return formatted

        # Fallback
        return [
            {
                **item,
                "backdrop_url": f"{self.image_base_url}/original{item['backdrop_path']}",
                "poster_url": f"{self.image_base_url}/w500{item['poster_path']}"
            }
            for item in MOCK_TOP20
        ]

    async def get_popular_movies(self) -> List[Dict[str, Any]]:
        data = await self._fetch("movie/popular")
        if data and "results" in data:
            return [self._format_item(item, "movie") for item in data["results"]]
        return []

    async def get_now_playing_movies(self) -> List[Dict[str, Any]]:
        data = await self._fetch("movie/now_playing")
        if data and "results" in data:
            return [self._format_item(item, "movie") for item in data["results"]]
        return []

    async def get_popular_tv(self) -> List[Dict[str, Any]]:
        data = await self._fetch("tv/popular")
        if data and "results" in data:
            return [self._format_item(item, "tv") for item in data["results"]]
        return []

    async def get_on_the_air_tv(self) -> List[Dict[str, Any]]:
        data = await self._fetch("tv/on_the_air")
        if data and "results" in data:
            return [self._format_item(item, "tv") for item in data["results"]]
        return []

    async def get_genre_content(self, media_type: str, genre_id: int) -> List[Dict[str, Any]]:
        endpoint = f"discover/{media_type}"
        data = await self._fetch(endpoint, {"with_genres": str(genre_id), "sort_by": "popularity.desc"})
        if data and "results" in data:
            return [self._format_item(item, media_type) for item in data["results"]]
        return []

    async def get_details(self, media_type: str, item_id: int) -> Optional[Dict[str, Any]]:
        endpoint = f"{media_type}/{item_id}"
        data = await self._fetch(endpoint, {
            "append_to_response": "credits,videos,similar"
        })

        if not data:
            for banner in MOCK_BANNERS:
                if banner["id"] == item_id:
                    return {
                        **banner,
                        "backdrop_url": f"{self.image_base_url}/original{banner['backdrop_path']}",
                        "poster_url": f"{self.image_base_url}/w500{banner['poster_path']}",
                        "runtime": 120,
                        "cast": [{"id": 1, "name": "주연 배우", "character": "주인공", "profile_url": None}],
                        "videos": [{"key": "dQw4w9WgXcQ", "name": "공식 티저 예고편", "site": "YouTube", "type": "Trailer"}],
                        "similar": []
                    }
            return None

        cast = []
        if "credits" in data and "cast" in data["credits"]:
            for person in data["credits"]["cast"][:10]:
                cast.append({
                    "id": person.get("id"),
                    "name": person.get("name"),
                    "character": person.get("character"),
                    "profile_url": f"{self.image_base_url}/w185{person.get('profile_path')}" if person.get("profile_path") else None
                })

        videos = []
        if "videos" in data and "results" in data["videos"]:
            for v in data["videos"]["results"]:
                if v.get("site") == "YouTube":
                    videos.append({
                        "key": v.get("key"),
                        "name": v.get("name"),
                        "type": v.get("type"),
                        "site": "YouTube"
                    })

        similar = []
        if "similar" in data and "results" in data["similar"]:
            similar = [self._format_item(s, media_type) for s in data["similar"]["results"][:8]]

        formatted = self._format_item(data, media_type)
        formatted["cast"] = cast
        formatted["videos"] = videos
        formatted["similar"] = similar
        formatted["runtime"] = data.get("runtime") or (data.get("episode_run_time", [60])[0] if data.get("episode_run_time") else 60)
        formatted["status"] = data.get("status")
        formatted["tagline"] = data.get("tagline")
        formatted["number_of_seasons"] = data.get("number_of_seasons")
        formatted["number_of_episodes"] = data.get("number_of_episodes")

        return formatted

    async def search(self, query: str) -> List[Dict[str, Any]]:
        if not query:
            return []
        data = await self._fetch("search/multi", {"query": query, "include_adult": "false"})
        if data and "results" in data:
            results = []
            for item in data["results"]:
                mtype = item.get("media_type")
                if mtype in ["movie", "tv"]:
                    results.append(self._format_item(item, mtype))
            return results
        
        query_lower = query.lower()
        results = []
        for item in MOCK_BANNERS + MOCK_TOP20:
            if query_lower in item["title"].lower() or (item.get("overview") and query_lower in item["overview"].lower()):
                results.append({
                    **item,
                    "backdrop_url": f"{self.image_base_url}/original{item.get('backdrop_path', '')}",
                    "poster_url": f"{self.image_base_url}/w500{item.get('poster_path', '')}"
                })
        return results

    async def get_shortcuts(self) -> List[Dict[str, Any]]:
        """TMDB 기반 퀵 바로가기 12개 카테고리"""
        # 인기 영화 및 TV 가져오기
        pop_movies = await self.get_popular_movies()
        pop_tv = await self.get_popular_tv()
        now_movies = await self.get_now_playing_movies()

        # 장르별 대표작
        action_movies = await self.get_genre_content("movie", 28)
        romance_movies = await self.get_genre_content("movie", 10749)
        sf_movies = await self.get_genre_content("movie", 878)
        thriller_movies = await self.get_genre_content("movie", 53)
        animation_movies = await self.get_genre_content("movie", 16)
        comedy_movies = await self.get_genre_content("movie", 35)
        crime_movies = await self.get_genre_content("movie", 80)

        def get_img(items, fallback_idx=0):
            if items and len(items) > 0 and items[0].get("poster_url"):
                return items[0]["poster_url"]
            fallbacks = [
                "https://image.tmdb.org/t/p/w500/8d1hU3mJ93J51a7w6T9d4y9U0zX.jpg",
                "https://image.tmdb.org/t/p/w500/fW9k1hYq9xHh4Z0Yp4Xp2P4Zk0K.jpg",
                "https://image.tmdb.org/t/p/w500/9aA46cR604e3X5Y5g1k68c8W5H8.jpg",
                "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
                "https://image.tmdb.org/t/p/w500/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg",
            ]
            return fallbacks[fallback_idx % len(fallbacks)]

        return [
            {
                "id": "trending",
                "title": "오늘의 트렌딩",
                "subtitle": "TMDB 실시간 화제작",
                "has_badge": True,
                "badge_text": "HOT",
                "image_url": get_img(pop_movies, 0),
                "items": pop_movies[:8]
            },
            {
                "id": "now_playing",
                "title": "최신 개봉작",
                "subtitle": "극장 동시 상영작",
                "has_badge": True,
                "badge_text": "NEW",
                "image_url": get_img(now_movies, 1),
                "items": now_movies[:8]
            },
            {
                "id": "action",
                "title": "액션 블록버스터",
                "subtitle": "스펙터클 액션 컬렉션",
                "has_badge": False,
                "image_url": get_img(action_movies, 2),
                "items": action_movies[:8]
            },
            {
                "id": "romance",
                "title": "로맨스 & 멜로",
                "subtitle": "설레는 사랑 이야기",
                "has_badge": False,
                "image_url": get_img(romance_movies, 3),
                "items": romance_movies[:8]
            },
            {
                "id": "scifi",
                "title": "SF & 판타지",
                "subtitle": "상상력의 한계를 넘어",
                "has_badge": False,
                "image_url": get_img(sf_movies, 4),
                "items": sf_movies[:8]
            },
            {
                "id": "thriller",
                "title": "공포 & 스릴러",
                "subtitle": "심장을 조여오는 서스펜스",
                "has_badge": True,
                "badge_text": "N",
                "image_url": get_img(thriller_movies, 0),
                "items": thriller_movies[:8]
            },
            {
                "id": "animation",
                "title": "명작 애니메이션",
                "subtitle": "감동과 재미의 세계",
                "has_badge": False,
                "image_url": get_img(animation_movies, 1),
                "items": animation_movies[:8]
            },
            {
                "id": "comedy",
                "title": "유쾌한 코미디",
                "subtitle": "유쾌하게 웃고 싶을 때",
                "has_badge": False,
                "image_url": get_img(comedy_movies, 2),
                "items": comedy_movies[:8]
            },
            {
                "id": "crime",
                "title": "범죄 & 미스터리",
                "subtitle": "치밀한 두뇌 추리극",
                "has_badge": False,
                "image_url": get_img(crime_movies, 3),
                "items": crime_movies[:8]
            },
            {
                "id": "tv_popular",
                "title": "인기 시리즈",
                "subtitle": "정주행 필수 TV 드라마",
                "has_badge": True,
                "badge_text": "HOT",
                "image_url": get_img(pop_tv, 4),
                "items": pop_tv[:8]
            },
            {
                "id": "top_rated",
                "title": "역대 최고 평점",
                "subtitle": "평점 8.5 이상 마스터피스",
                "has_badge": False,
                "image_url": get_img(pop_movies, 1),
                "items": pop_movies[:8]
            },
            {
                "id": "random_pick",
                "title": "오늘 뭐 볼까?",
                "subtitle": "TMDB AI 맞춤 추천",
                "has_badge": True,
                "badge_text": "PICK",
                "image_url": get_img(pop_tv, 0),
                "items": pop_movies[:8]
            }
        ]

tmdb_service = TMDBService()
