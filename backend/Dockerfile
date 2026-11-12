# Python 3.11 경량 슬림 이미지 사용
FROM python:3.11-slim

# 작업 디렉토리 설정
WORKDIR /app

# 파이썬 버퍼링 비활성화 (로그 즉시 출력) 및 pyc 생성 방지
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# 빌드 및 런타임 필수 패키지 설치
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# 의존성 파일 복사 및 설치 (캐시 활용)
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# 애플리케이션 소스코드 복사
COPY . .

# 포트 개방
EXPOSE 8000

# FastAPI uvicorn 서버 실행
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
