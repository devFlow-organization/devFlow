# MongoDB 설정 가이드

## 개요
이 프로젝트는 H2 데이터베이스에서 MongoDB로 마이그레이션되었습니다.

## MongoDB 설치 및 실행

### 1. Docker를 사용한 MongoDB 실행 (권장)

```bash
# Docker Compose로 MongoDB 실행
docker-compose up -d

# MongoDB 상태 확인
docker-compose ps

# MongoDB 로그 확인
docker-compose logs mongodb
```

### 2. 로컬 MongoDB 설치

#### Windows
1. [MongoDB Community Server](https://www.mongodb.com/try/download/community) 다운로드
2. 설치 후 MongoDB 서비스 시작

#### macOS
```bash
# Homebrew로 설치
brew tap mongodb/brew
brew install mongodb-community

# MongoDB 서비스 시작
brew services start mongodb/brew/mongodb-community
```

#### Linux (Ubuntu)
```bash
# MongoDB 설치
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# MongoDB 서비스 시작
sudo systemctl start mongod
sudo systemctl enable mongod
```

## 데이터베이스 설정

### 1. 데이터베이스 생성
```bash
# MongoDB 접속
mongosh

# 데이터베이스 생성 및 사용
use devflow

# 컬렉션 생성
db.createCollection('users')
db.createCollection('threads')
db.createCollection('messages')

# 인덱스 생성
db.users.createIndex({ "email": 1 }, { unique: true })
db.users.createIndex({ "provider": 1, "provider_id": 1 }, { unique: true })
db.threads.createIndex({ "user_id": 1, "deleted": 1 })
db.threads.createIndex({ "updated_at": -1 })
db.messages.createIndex({ "thread_id": 1, "created_at": 1 })
```

### 2. 애플리케이션 설정

#### 개발 환경
```yaml
# application-dev.yml
spring:
  data:
    mongodb:
      uri: mongodb://localhost:27017/devflow-dev
      database: devflow-dev
```

#### 테스트 환경
```yaml
# application-test.yml
spring:
  data:
    mongodb:
      uri: mongodb://localhost:27017/devflow-test
      database: devflow-test
```

## MongoDB 관리 도구

### 1. Mongo Express (웹 기반 관리 도구)
Docker Compose로 실행 시 자동으로 설치됩니다.
- URL: http://localhost:8081
- 사용자명: admin
- 비밀번호: password

### 2. MongoDB Compass (GUI 도구)
- [MongoDB Compass](https://www.mongodb.com/try/download/compass) 다운로드
- 연결 문자열: `mongodb://localhost:27017`

## 주요 변경사항

### 1. 엔티티 변경
- JPA 어노테이션 → MongoDB 어노테이션
- `@Entity` → `@Document`
- `@Column` → `@Field`
- ID 타입: `Long` → `String`

### 2. 레포지토리 변경
- `JpaRepository` → `MongoRepository`
- 쿼리 언어: JPQL → MongoDB Query

### 3. 의존성 변경
```kotlin
// 기존
implementation("org.springframework.boot:spring-boot-starter-data-jpa")
runtimeOnly("com.h2database:h2")

// 변경
implementation("org.springframework.boot:spring-boot-starter-data-mongodb")
```

## 문제 해결

### 1. MongoDB 연결 실패
```bash
# MongoDB 서비스 상태 확인
sudo systemctl status mongod

# MongoDB 포트 확인
netstat -tlnp | grep 27017
```

### 2. 인증 오류
```bash
# MongoDB 인증 없이 접속
mongosh --host localhost --port 27017
```

### 3. 데이터 마이그레이션
기존 H2 데이터베이스에서 MongoDB로 데이터를 마이그레이션하려면 별도의 스크립트가 필요합니다.

## 개발 팁

### 1. MongoDB 쿼리 예제
```javascript
// 사용자 조회
db.users.find({ "email": "user@example.com" })

// 스레드 조회 (삭제되지 않은 것만)
db.threads.find({ "user_id": "userId", "deleted": false })

// 메시지 조회
db.messages.find({ "thread_id": "threadId" }).sort({ "created_at": 1 })
```

### 2. 성능 최적화
- 적절한 인덱스 생성
- 쿼리 최적화
- 연결 풀 설정

### 3. 모니터링
```bash
# MongoDB 상태 확인
mongosh --eval "db.serverStatus()"

# 데이터베이스 통계
mongosh --eval "db.stats()"
``` 