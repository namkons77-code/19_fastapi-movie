#!/bin/bash
set -e

# ==========================================
# AWS EC2 (Ubuntu) Docker 원클릭 초기 셋업 스크립트
# ==========================================

echo "=========================================="
echo "📦 [1/4] 시스템 패키지 업데이트 및 필수 도구 설치..."
echo "=========================================="
sudo apt-get update -y
sudo apt-get install -y ca-certificates curl gnupg lsb-release git

echo ""
echo "=========================================="
echo "🐳 [2/4] 공식 Docker 저장소 추가 및 Docker 설치..."
echo "=========================================="
# Docker 공식 GPG 키 추가
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg --yes

# Docker 저장소 설정
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update -y
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

echo ""
echo "=========================================="
echo "👤 [3/4] 현재 사용자($USER)에게 Docker 실행 권한 부여..."
echo "=========================================="
sudo usermod -aG docker $USER

echo ""
echo "=========================================="
echo "✅ [4/4] Docker 및 Docker Compose 버전 확인..."
echo "=========================================="
docker --version || sudo docker --version
docker compose version || sudo docker compose version

echo ""
echo "🎉 EC2 Docker 환경 셋업이 완료되었습니다!"
echo "⚠️  권한 적용을 위해 터미널을 나갔다 다시 접속(ssh 재접속)하거나 아래 명령어를 실행하세요:"
echo "    newgrp docker"
