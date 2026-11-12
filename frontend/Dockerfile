# 1단계: 빌드 환경 (Node.js 20 Alpine)
FROM node:20-alpine AS builder

WORKDIR /app

# 의존성 설치 캐싱을 위해 package 파일 먼저 복사
COPY package.json package-lock.json* ./
RUN npm ci

# 소스코드 복사 및 프로덕션 빌드
COPY . .
RUN npm run build

# 2단계: 서비스 환경 (Nginx Alpine 경량 이미지)
FROM nginx:alpine

# Nginx 커스텀 설정 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 1단계에서 빌드된 정적 결과물 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# 80번 포트 개방
EXPOSE 80

# Nginx 백그라운드가 아닌 포그라운드 실행
CMD ["nginx", "-g", "daemon off;"]
