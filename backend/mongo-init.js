// MongoDB 초기화 스크립트
db = db.getSiblingDB('devflow');

// 사용자 컬렉션 생성
db.createCollection('users');

// 스레드 컬렉션 생성
db.createCollection('threads');

// 메시지 컬렉션 생성
db.createCollection('messages');

// 인덱스 생성
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "provider": 1, "provider_id": 1 }, { unique: true });
db.threads.createIndex({ "user_id": 1, "deleted": 1 });
db.threads.createIndex({ "updated_at": -1 });
db.messages.createIndex({ "thread_id": 1, "created_at": 1 });

print('MongoDB 초기화 완료'); 