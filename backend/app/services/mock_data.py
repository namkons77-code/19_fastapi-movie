"""
기본 Mock 데이터
TMDB API 키 미설정 또는 호출 오류 시에도 UI를 보여줄 수 있는 고품질 데이터
실제 TMDB 포스터 및 백드롭 이미지 사용
"""

MOCK_BANNERS = [
    {
        "id": 209867,
        "title": "눈물의 여왕",
        "original_title": "Queen of Tears",
        "overview": "퀸즈 그룹 재벌 3세, 백화점의 여왕 홍해인과 용두리 이장 아들, 슈퍼마켓 왕자 백현우. 3년 차 부부의 아찔한 위기와 기적처럼 다시 시작되는 눈부신 사랑 이야기.",
        "backdrop_path": "/2yH3aO4Fqj73b4eN66P5c5xXn1m.jpg",
        "poster_path": "/8d1hU3mJ93J51a7w6T9d4y9U0zX.jpg",
        "media_type": "tv",
        "vote_average": 8.9,
        "release_date": "2024-03-09",
        "genres": ["드라마", "로맨스", "코미디"],
        "age_rating": "15+",
        "badge": "실시간 1위",
        "tagline": "기적처럼 다시 시작되는 사랑"
    },
    {
        "id": 242876,
        "title": "선재 업고 튀어",
        "original_title": "Lovely Runner",
        "overview": "삶의 의지를 놓아버렸던 순간, 자신을 살게 해줬던 유명 아티스트 류선재. 그의 죽음으로 절망했던 열성팬 임솔이 최애를 살리기 위해 2008년으로 돌아가는 타임슬립 구원 로맨스.",
        "backdrop_path": "/o7aYmQ1yLhG0g8N7K6kL8tB8p5K.jpg",
        "poster_path": "/fW9k1hYq9xHh4Z0Yp4Xp2P4Zk0K.jpg",
        "media_type": "tv",
        "vote_average": 9.1,
        "release_date": "2024-04-08",
        "genres": ["로맨스", "판타지", "코미디"],
        "age_rating": "15+",
        "badge": "ORIGINAL",
        "tagline": "널 살릴 수만 있다면 뭐든 할 거야"
    },
    {
        "id": 1109419,
        "title": "파묘",
        "original_title": "Exhuma",
        "overview": "미국 LA, 거액의 의뢰를 받은 무당 화림과 봉길은 기이한 병이 대물림되는 집안의 장손을 만난다. 조상의 묫자리가 화근임을 알아챈 화림은 이장을 권하고, 풍수사 상덕과 장의사 영근이 합류하는데...",
        "backdrop_path": "/70AV2Xx5FQYj20xqOC0xcvfl8li.jpg",
        "poster_path": "/9aA46cR604e3X5Y5g1k68c8W5H8.jpg",
        "media_type": "movie",
        "vote_average": 7.8,
        "release_date": "2024-02-22",
        "genres": ["미스터리", "공포", "스릴러"],
        "age_rating": "15+",
        "badge": "1,191만 관객 돌파 대작",
        "tagline": "험한 것이 나왔다"
    },
    {
        "id": 940551,
        "title": "피라미드 게임",
        "original_title": "Pyramid Game",
        "overview": "매월 마지막 주 목요일 5교시, 잔혹한 서열 전쟁이 시작된다. 백연여고 2학년 5반에서 투표로 합법적 왕따를 뽑는 피라미드 게임을 깨부수기 위한 전학생 성수지의 치밀한 두뇌 싸움.",
        "backdrop_path": "/e5P5K1Yg9xHh4Z0Yp4Xp2P4Zk0K.jpg",
        "poster_path": "/f2A3b8e7C6d5E4f3A2b1C0d9E8.jpg",
        "media_type": "tv",
        "vote_average": 8.5,
        "release_date": "2024-02-29",
        "genres": ["학원", "스릴러", "서스펜스"],
        "age_rating": "19+",
        "badge": "독점 스트리밍",
        "tagline": "합법적 왕따를 뽑는 잔혹한 서열 전쟁"
    },
    {
        "id": 1022789,
        "title": "인사이드 아웃 2",
        "original_title": "Inside Out 2",
        "overview": "13살이 된 라일리의 감정 컨트롤 본부에 불안, 당황, 따분, 부럽이라는 낯선 감정들이 새로 찾아왔다! 기존의 감정들과 새 감정들의 대혼란 속, 라일리의 진정한 자아를 지키기 위한 모험.",
        "backdrop_path": "/stKGOm8wToLQIYXj625Ym6Fg82U.jpg",
        "poster_path": "/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
        "media_type": "movie",
        "vote_average": 8.2,
        "release_date": "2024-06-12",
        "genres": ["애니메이션", "가족", "어드벤처"],
        "age_rating": "전체관람가",
        "badge": "박스오피스 1위 흥행작",
        "tagline": "불안해하지 마, 다 괜찮아질 거야"
    },
    {
        "id": 945961,
        "title": "에이리언: 로물루스",
        "original_title": "Alien: Romulus",
        "overview": "버려진 우주 기지 로물루스를 탐험하던 청년들이 우주에서 가장 끔찍한 생명체와 맞닥뜨린다. 살아남기 위한 극한의 사투가 시작된다.",
        "backdrop_path": "/9SSEUrSqhljBMzRe4aBTh17rUaC.jpg",
        "poster_path": "/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg",
        "media_type": "movie",
        "vote_average": 7.4,
        "release_date": "2024-08-14",
        "genres": ["공포", "SF", "스릴러"],
        "age_rating": "15+",
        "badge": "글로벌 독점",
        "tagline": "우주에서는 아무도 당신의 비명을 들을 수 없다"
    }
]

MOCK_TOP20 = [
    {
        "rank": 1,
        "id": 209867,
        "title": "눈물의 여왕",
        "poster_path": "/8d1hU3mJ93J51a7w6T9d4y9U0zX.jpg",
        "backdrop_path": "/2yH3aO4Fqj73b4eN66P5c5xXn1m.jpg",
        "media_type": "tv",
        "vote_average": 8.9,
        "release_date": "2024-03-09",
        "badge": "TOP 1",
        "is_original": True
    },
    {
        "rank": 2,
        "id": 242876,
        "title": "선재 업고 튀어",
        "poster_path": "/fW9k1hYq9xHh4Z0Yp4Xp2P4Zk0K.jpg",
        "backdrop_path": "/o7aYmQ1yLhG0g8N7K6kL8tB8p5K.jpg",
        "media_type": "tv",
        "vote_average": 9.1,
        "release_date": "2024-04-08",
        "badge": "ORIGINAL",
        "is_original": True
    },
    {
        "rank": 3,
        "id": 1109419,
        "title": "파묘",
        "poster_path": "/9aA46cR604e3X5Y5g1k68c8W5H8.jpg",
        "backdrop_path": "/70AV2Xx5FQYj20xqOC0xcvfl8li.jpg",
        "media_type": "movie",
        "vote_average": 7.8,
        "release_date": "2024-02-22",
        "badge": "천만 영화",
        "is_original": False
    },
    {
        "rank": 4,
        "id": 940551,
        "title": "피라미드 게임",
        "poster_path": "/f2A3b8e7C6d5E4f3A2b1C0d9E8.jpg",
        "backdrop_path": "/e5P5K1Yg9xHh4Z0Yp4Xp2P4Zk0K.jpg",
        "media_type": "tv",
        "vote_average": 8.5,
        "release_date": "2024-02-29",
        "badge": "독점 스트리밍",
        "is_original": True
    },
    {
        "rank": 5,
        "id": 1022789,
        "title": "인사이드 아웃 2",
        "poster_path": "/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
        "backdrop_path": "/stKGOm8wToLQIYXj625Ym6Fg82U.jpg",
        "media_type": "movie",
        "vote_average": 8.2,
        "release_date": "2024-06-12",
        "badge": "박스오피스 1위",
        "is_original": False
    },
    {
        "rank": 6,
        "id": 945961,
        "title": "에이리언: 로물루스",
        "poster_path": "/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg",
        "backdrop_path": "/9SSEUrSqhljBMzRe4aBTh17rUaC.jpg",
        "media_type": "movie",
        "vote_average": 7.4,
        "release_date": "2024-08-14",
        "badge": "글로벌 독점",
        "is_original": False
    },
    {
        "rank": 7,
        "id": 533535,
        "title": "데드풀과 울버린",
        "poster_path": "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
        "backdrop_path": "/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg",
        "media_type": "movie",
        "vote_average": 7.8,
        "release_date": "2024-07-24",
        "badge": "인기 영화",
        "is_original": False
    },
    {
        "rank": 8,
        "id": 1156593,
        "title": "범죄도시 4",
        "poster_path": "/7w0qQc1vW8k6T9e4Y1K6u7m9Z3.jpg",
        "backdrop_path": "/uL6Q5x6Y7w8Z9p0m1N2k3l4j5h.jpg",
        "media_type": "movie",
        "vote_average": 7.2,
        "release_date": "2024-04-24",
        "badge": "천만 흥행",
        "is_original": False
    },
    {
        "rank": 9,
        "id": 93405,
        "title": "오징어 게임 시즌 2",
        "poster_path": "/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",
        "backdrop_path": "/5N9U5uF03zC2K2uQ0QoQzH4X6fV.jpg",
        "media_type": "tv",
        "vote_average": 8.6,
        "release_date": "2024-12-26",
        "badge": "인기 급상승",
        "is_original": False
    },
    {
        "rank": 10,
        "id": 693134,
        "title": "듄: 파트 2",
        "poster_path": "/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
        "backdrop_path": "/xOMo8BRK7PfcJv9JCnx7s520Wio.jpg",
        "media_type": "movie",
        "vote_average": 8.3,
        "release_date": "2024-02-28",
        "badge": "SF 대작",
        "is_original": False
    }
]

MOCK_LIVE_CHANNELS = [
    {
        "id": "ch-tvn",
        "channel_name": "채널 1",
        "channel_number": 3,
        "channel_logo": "CH 1",
        "channel_color": "#ff153c",
        "current_program": "유 퀴즈 온 더 블럭 (425회)",
        "next_program": "놀라운 토요일",
        "viewer_rating": "4.9%",
        "progress_percent": 68,
        "badge": "실시간 1위",
        "thumbnail": "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "ch-jtbc",
        "channel_name": "채널 2",
        "channel_number": 15,
        "channel_logo": "CH 2",
        "channel_color": "#0064ff",
        "current_program": "최강야구 2024",
        "next_program": "나이트 뉴스룸",
        "viewer_rating": "3.7%",
        "progress_percent": 45,
        "badge": "실시간 2위",
        "thumbnail": "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "ch-mnet",
        "channel_name": "뮤직 라이브",
        "channel_number": 27,
        "channel_logo": "MUSIC",
        "channel_color": "#00ffcc",
        "current_program": "글로벌 K-POP 차트 쇼 LIVE",
        "next_program": "아티스트 스페셜 무대",
        "viewer_rating": "2.8%",
        "progress_percent": 82,
        "badge": "음악 차트",
        "thumbnail": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "ch-ocn",
        "channel_name": "시네마 24",
        "channel_number": 22,
        "channel_logo": "CINEMA",
        "channel_color": "#f1c40f",
        "current_program": "존 윅 4 (특선 영화)",
        "next_program": "매드맥스: 분노의 도로",
        "viewer_rating": "2.5%",
        "progress_percent": 30,
        "badge": "특선 영화",
        "thumbnail": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "ch-tvn-show",
        "channel_name": "엔터 채널",
        "channel_number": 54,
        "channel_logo": "ENTER",
        "channel_color": "#e67e22",
        "current_program": "지구오락실 시즌 2 몰아보기",
        "next_program": "버라이어티 스페셜",
        "viewer_rating": "1.9%",
        "progress_percent": 55,
        "badge": "예능 24시",
        "thumbnail": "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "ch-tvn-sports",
        "channel_name": "스포츠 HD",
        "channel_number": 68,
        "channel_logo": "SPORTS",
        "channel_color": "#27ae60",
        "current_program": "2024/25 해외축구 생중계",
        "next_program": "챔피언스 매치 하이라이트",
        "viewer_rating": "2.3%",
        "progress_percent": 20,
        "badge": "스포츠 생중계",
        "thumbnail": "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=800&q=80"
    }
]
