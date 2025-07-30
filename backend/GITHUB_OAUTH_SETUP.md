# GitHub OAuth 설정 가이드

## 1. GitHub OAuth App 생성

1. GitHub → Settings → Developer settings → OAuth Apps → New OAuth App
2. 설정:
   - **Application name**: DevFlow
   - **Homepage URL**: `http://localhost:4500` (개발용)
   - **Authorization callback URL**: `https://your-ngrok-url.ngrok.io/auth/github/callback`

## 2. ngrok 설정 (추천 방법)

### ngrok 설치
```bash
# Windows (Chocolatey)
choco install ngrok

# 또는 https://ngrok.com/download 에서 다운로드
```

### ngrok 실행
```bash
# 프론트엔드 포트 터널링
ngrok http 4500
```

### GitHub OAuth App 설정
- **Authorization callback URL**: `https://your-ngrok-url.ngrok.io/auth/github/callback`

### application.properties 설정
```properties
oauth.github.redirect-uri=https://your-ngrok-url.ngrok.io/auth/github/callback
```

## 3. 로컬 개발 설정 (localhost 허용하는 경우)

GitHub OAuth App에서 localhost를 허용하는 경우:

### GitHub OAuth App 설정
- **Authorization callback URL**: `http://localhost:3000/auth/github/callback`

### application.properties 설정
```properties
oauth.github.redirect-uri=http://localhost:3000/auth/github/callback
```

## 4. 환경별 실행

### 개발 환경 실행
```bash
# ngrok 사용시
./gradlew :devflow-interfaces:bootRun --args='--spring.profiles.active=dev'

# 또는
java -jar devflow-interfaces/build/libs/devflow-interfaces-0.0.1-SNAPSHOT.jar --spring.profiles.active=dev
```

## 5. 테스트

1. 프론트엔드 실행 (4500 포트)
2. 백엔드 실행 (8080 포트)
3. ngrok 실행 (프론트엔드 터널링)
4. GitHub OAuth App의 callback URL을 ngrok URL로 업데이트
5. 로그인 테스트

## 주의사항

- **localhost는 GitHub OAuth에서 허용되지 않습니다**
- **ngrok URL은 매번 변경되므로 OAuth App 설정을 업데이트해야 합니다**
- **프로덕션에서는 실제 도메인을 사용해야 합니다** 