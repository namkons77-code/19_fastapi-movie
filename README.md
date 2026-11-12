# CINEFLIX - React(Vite) + FastAPI TMDB 미디어 스트리밍 웹 애플리케이션

**CINEFLIX**는 **FastAPI** 백엔드에서 **TMDB (The Movie Database) API**를 비동기로 연동하고, **React (Vite) + Tailwind CSS** 프론트엔드로 프리미엄 OTT 스트리밍 UI/UX를 제공하는 풀스택 미디어 플랫폼입니다.

---

## 🐳 Docker를 이용한 AWS EC2 배포 가이드

### 1. 사전 준비 (AWS 콘솔)
1. **EC2 인스턴스 생성**: Ubuntu 22.04 또는 24.04 LTS (`t2.micro` / `t3.micro` 프리티어)
2. **보안 그룹(Security Group) 인바운드 규칙 설정**:
   - `HTTP (80)`: 0.0.0.0/0
   - `HTTPS (443)`: 0.0.0.0/0
   - `SSH (22)`: 내 IP (또는 0.0.0.0/0)
3. **SSH 키페어(`.pem`) 다운로드**

---

### 2. EC2 서버 최초 설정 (원클릭)
SSH로 EC2 인스턴스에 접속한 뒤 아래 명령어를 실행합니다:

```bash
# 1. 깃허브 저장소 클론
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>

# 2. Docker & Docker Compose 원클릭 셋업 스크립트 실행
chmod +x setup-ec2.sh deploy.sh
./setup-ec2.sh

# 3. Docker 그룹 권한 즉시 적용
newgrp docker
```

---

### 3. 환경 변수 설정 및 첫 배포 실행
```bash
# .env 생성 및 TMDB API 키 입력
cp .env.example .env
nano .env   # TMDB_API_KEY 및 TMDB_ACCESS_TOKEN 입력 후 Ctrl+O, Enter, Ctrl+X

# 배포 스크립트 실행 (빌드 & 컨테이너 가동)
./deploy.sh
```

배포가 완료되면 브라우저에서 `http://<EC2_퍼블릭_IPv4_주소>`로 접속하시면 서비스가 바로 열립니다.

---

### 4. 코드 수정 후 지속적 배포 (GitHub 연동)

#### 방법 A: EC2 서버에서 원클릭 업데이트 (간편 방식)
로컬에서 코드를 수정하고 깃허브에 push한 뒤, EC2 터미널에서 다음 명령어 한 줄만 실행하면 됩니다:
```bash
./deploy.sh
```
*(최신 코드 Git Pull ➜ Docker 이미지 무중단 빌드 & 교체 ➜ 불필요한 구버전 이미지 정리가 자동 수행됩니다.)*

#### 방법 B: GitHub Actions 완전 자동 배포 (CI/CD)
GitHub 저장소 `Settings > Secrets and variables > Actions`에 아래 시크릿을 등록하면, `main` 브랜치에 push할 때마다 EC2에 자동으로 무중단 배포됩니다:
- `EC2_HOST`: EC2 퍼블릭 IP
- `EC2_USERNAME`: `ubuntu`
- `EC2_SSH_KEY`: 다운로드받은 `.pem` 파일의 전체 내용

---

## 📁 프로젝트 구조

```
19_fastapi-movie/
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions EC2 자동 배포 파이프라인
├── backend/                  # FastAPI 백엔드
│   ├── app/
│   │   ├── config.py
│   │   ├── main.py
│   │   ├── services/
│   │   └── routers/
│   ├── Dockerfile            # 백엔드 경량 Docker 이미지 정의
│   ├── .dockerignore
│   ├── .env
│   ├── .env.example
│   └── requirements.txt
├── frontend/                 # React 19 + Vite 8 + Tailwind CSS
│   ├── src/
│   │   ├── components/
│   │   ├── api/
│   │   ├── types/
│   │   └── App.tsx
│   ├── Dockerfile            # Multi-stage 빌드 Dockerfile
│   ├── nginx.conf            # Nginx SPA 라우팅 및 /api 리버스 프록시
│   ├── .dockerignore
│   └── vite.config.ts
├── docker-compose.yml        # 프론트엔드 + 백엔드 통합 오케스트레이션
├── deploy.sh                 # EC2 원클릭 자동 배포/업데이트 스크립트
├── setup-ec2.sh              # EC2 인스턴스 Docker 원클릭 셋업 스크립트
├── .dockerignore
├── .gitignore                # API 키 및 보안 파일 보호
├── .env                      # 루트 환경변수 파일
└── README.md
```

---

## 💻 로컬 개발 환경 실행

```bash
# 백엔드 실행 (포트 8000)
cd backend
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# 프론트엔드 실행 (포트 5173)
cd frontend
npm run dev
```
