# DevFlow Backend API 테스트 스크립트

Write-Host "🚀 DevFlow Backend API 테스트 시작" -ForegroundColor Green

# 1. 애플리케이션 상태 확인
Write-Host "`n1. 애플리케이션 상태 확인..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/actuator/health" -Method GET
    Write-Host "✅ 애플리케이션이 정상 실행 중입니다." -ForegroundColor Green
} catch {
    Write-Host "❌ 애플리케이션이 실행되지 않았습니다. 먼저 애플리케이션을 실행해주세요." -ForegroundColor Red
    exit 1
}

# 2. GitHub 로그인 URL 조회 테스트
Write-Host "`n2. GitHub 로그인 URL 조회 테스트..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/auth/github/login" -Method GET
    Write-Host "✅ GitHub 로그인 URL 조회 성공" -ForegroundColor Green
    Write-Host "   URL: $($response.loginUrl)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ GitHub 로그인 URL 조회 실패: $($_.Exception.Message)" -ForegroundColor Red
}

# 3. GitHub OAuth 인증 테스트 (실제로는 유효하지 않은 코드)
Write-Host "`n3. GitHub OAuth 인증 테스트..." -ForegroundColor Yellow
try {
    $authRequest = @{
        code = "invalid_code"
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/auth/github/authenticate" -Method POST -Body $authRequest -ContentType "application/json"
    Write-Host "❌ 예상과 다름: 성공 응답을 받았습니다" -ForegroundColor Red
} catch {
    $errorResponse = $_.Exception.Response
    if ($errorResponse.StatusCode -eq 400) {
        Write-Host "✅ 예상대로 실패 응답을 받았습니다 (400 Bad Request)" -ForegroundColor Green
    } else {
        Write-Host "❌ 예상과 다른 에러: $($errorResponse.StatusCode)" -ForegroundColor Red
    }
}

# 4. H2 데이터베이스 콘솔 확인
Write-Host "`n4. H2 데이터베이스 콘솔 확인..." -ForegroundColor Yellow
Write-Host "   H2 콘솔: http://localhost:8080/h2-console" -ForegroundColor Cyan
Write-Host "   JDBC URL: jdbc:h2:mem:testdb" -ForegroundColor Cyan
Write-Host "   Username: sa" -ForegroundColor Cyan
Write-Host "   Password: (비어있음)" -ForegroundColor Cyan

Write-Host "`n🎉 API 테스트 완료!" -ForegroundColor Green
Write-Host "`n📝 다음 단계:" -ForegroundColor Yellow
Write-Host "1. GitHub OAuth App 생성" -ForegroundColor White
Write-Host "2. application.properties에 client-id, client-secret 설정" -ForegroundColor White
Write-Host "3. 실제 GitHub 로그인 테스트" -ForegroundColor White 