# DevFlow Project

DevFlow는 개발 팀의 효율성을 향상시키는 통합 개발 관리 플랫폼입니다.

## 프로젝트 구조

```
devFlow_mono/
├── backend/          # Spring Boot 백엔드 (Kotlin)
└── frontend/         # React 프론트엔드 (TypeScript)
```

## 사전 요구사항

### Backend 요구사항
- Java 17 이상
- Gradle 8.x
- MongoDB (로컬 또는 Docker)

### Frontend 요구사항
- Node.js 18 이상
- npm 또는 yarn

## 실행 방법

### 1. Backend 실행

#### MongoDB 설정
먼저 MongoDB가 실행 중인지 확인하세요. Docker를 사용하는 경우:

```bash
# MongoDB 컨테이너 실행
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

#### Backend 서버 실행
```bash
# backend 디렉토리로 이동
cd backend

# Gradle을 사용하여 서버 실행
./gradlew :devflow-interfaces:bootRun
```

또는 Windows PowerShell에서:
```powershell
cd backend
./gradlew :devflow-interfaces:bootRun
```

서버가 성공적으로 시작되면 `http://localhost:8080`에서 접근할 수 있습니다.

### 2. Frontend 실행

#### 의존성 설치
```bash
# frontend 디렉토리로 이동
cd frontend

# 의존성 설치
npm install
```

#### 개발 서버 실행
```bash
# 개발 서버 시작
npm start
```

프론트엔드가 성공적으로 시작되면 `http://localhost:3000`에서 접근할 수 있습니다.
