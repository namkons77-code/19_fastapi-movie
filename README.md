# CINEFLIX - React(Vite) + FastAPI TMDB 미디어 스트리밍 웹 애플리케이션

**CINEFLIX**는 **FastAPI** 백엔드에서 **TMDB (The Movie Database) API**를 비동기로 연동하고, **React (Vite) + Tailwind CSS** 프론트엔드로 프리미엄 OTT 스트리밍 UI/UX를 제공하는 풀스택 미디어 플랫폼입니다.

---

## 📸 주요 기능 및 디자인 시스템

1. **모던 다크 테마 & 프리미엄 레드 포인트**
   - 딥 블랙(`#000000`) 배경과 강렬한 레드(`#ff153c`) 포인트 컬러
   - 스크롤 시 부드럽게 전환되는 블랙 블러(`backdrop-blur`) 상단 글로벌 네비게이션(GNB)
   - 홈 / 시리즈 / 영화 / 라이브 / 글로벌관 탭 전환

2. **대형 히어로 배너 슬라이더 (Hero Slider)**
   - 대형 백드롭 비주얼, 장르/평점/연령등급 뱃지, 부드러운 그라데이션 오버레이
   - 6초 주기 자동 슬라이드, 일시 정지, 슬라이드 넘버링 인디케이터(`01 / 06`)
   - '시청하기' 및 '상세정보' 원클릭 인터랙션

3. **오늘의 실시간 인기 TOP 20**
   - 1위부터 20위까지의 **초대형 이탤릭 볼드 랭킹 넘버**와 포스터 카드가 결합된 시그니처 랭킹 캐러셀
   - 마우스 호버 시 스케일업 및 플레이 버튼 오버레이

4. **다양한 카테고리 큐레이션 가로 슬라이더**
   - 단독 오리지널 & 독점작, 지금 가장 많이 본 영화, 화제의 인기 시리즈, 글로벌 독점 컬렉션 등
   - 좌우 슬라이드 화살표 네비게이션 및 부드러운 스크롤

5. **실시간 라이브 TV 채널 (Live Channels)**
   - 주요 방송 채널 편성표 (실시간 시청률, 타임라인 프로그레스 바)
   - 고화질 실시간 대형 프리뷰 플레이어

6. **실시간 검색 & 인기 검색어 (Search Modal)**
   - 1위~10위 실시간 인기 검색어 순위 제공
   - 영화/TV 통합 검색 및 포스터 그리드 결과 노출

7. **상세 모달 & 유튜브 트레일러 플레이어 (Detail Modal)**
   - 공식 유튜브 예고편(Trailer) 임베드 재생
   - 시놉시스, 주요 출연진 프로필 사진, 개봉일, 평점, 비슷한 추천 작품 큐레이션

---

## 📁 프로젝트 구조

```
19_fastapi-movie/
├── backend/                  # FastAPI 백엔드
│   ├── app/
│   │   ├── config.py         # .env 기반 TMDB 키 및 환경설정 로더
│   │   ├── main.py           # FastAPI 서버 엔트리포인트 및 CORS
│   │   ├── services/
│   │   │   ├── tmdb.py       # TMDB API 비동기 httpx 클라이언트
│   │   │   └── mock_data.py  # 키 미입력 시 고품질 폴백 데이터
│   │   └── routers/
│   │       ├── media.py      # 홈 피드, 실시간 TOP 20, 배너, 검색, 상세정보
│   │       ├── movies.py     # 영화 전용 피드
│   │       ├── tv.py         # 시리즈 전용 피드
│   │       └── live.py       # 실시간 TV 채널 편성표
│   ├── .env                  # TMDB API 키 & Secret 키
│   ├── .env.example
│   └── requirements.txt
├── frontend/                 # React 19 + Vite 8 + Tailwind CSS
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx        # 상단 네비게이션 (CINEFLIX)
│   │   │   ├── BannerHero.tsx    # 메인 풀스크린 롤링 배너
│   │   │   ├── TopRankingRow.tsx # 실시간 TOP 20 랭킹
│   │   │   ├── ContentRow.tsx    # 가로 스크롤 캐러셀
│   │   │   ├── ContentCard.tsx   # 콘텐츠 포스터 카드
│   │   │   ├── DetailModal.tsx   # 유튜브 공식 예고편 재생 & 상세 모달
│   │   │   ├── LiveChannels.tsx  # 실시간 TV 채널 편성표 & 라이브 플레이어
│   │   │   ├── SearchModal.tsx   # 실시간 인기 검색어 1~10위 & 검색
│   │   │   └── Footer.tsx        # 플랫폼 푸터
│   │   ├── api/
│   │   │   └── client.ts         # FastAPI 백엔드 연동 Axios 클라이언트
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── index.css
│   └── vite.config.ts            # Vite 프록시 (/api -> http://127.0.0.1:8000)
├── .env                          # 루트 환경변수 파일
└── README.md
```

---

## 🔑 환경 변수 (.env) 설정

[The Movie Database (TMDB)](https://www.themoviedb.org/) 회원가입 후 `설정 > API` 메뉴에서 API Key를 발급받아 `.env` 파일에 입력합니다:

```env
# TMDB v3 API Key (32자리)
TMDB_API_KEY=your_tmdb_api_key_here

# TMDB v4 Read Access Token (Secret Key 역할)
TMDB_SECRET_KEY=your_tmdb_access_token_here
TMDB_ACCESS_TOKEN=your_tmdb_access_token_here

# 백엔드 포트
PORT=8000
```

---

## 🚀 실행 방법

### 1. 백엔드 (FastAPI) 실행
```bash
cd backend
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
- API 서버: `http://localhost:8000`
- Swagger 문서: `http://localhost:8000/docs`

### 2. 프론트엔드 (React Vite) 실행
```bash
cd frontend
npm run dev
```
- 브라우저 접속: `http://localhost:5173`
