package com.devflow.application.auth

import com.devflow.domain.user.AuthProvider
import com.devflow.domain.user.User
import com.devflow.domain.user.UserRepository
import com.devflow.infrastructure.auth.GitHubOAuthClient
import com.devflow.infrastructure.auth.GitHubUserInfo
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class AuthService(
    private val userRepository: UserRepository,
    private val gitHubOAuthClient: GitHubOAuthClient
) {
    
    fun authenticateWithGitHub(code: String): AuthResult {
        try {
            // 1. GitHub에서 액세스 토큰 획득
            val tokenResponse = gitHubOAuthClient.getAccessToken(code)
            
            // 2. GitHub에서 사용자 정보 획득
            val gitHubUser = gitHubOAuthClient.getUserInfo(tokenResponse.accessToken)
            
            // 3. 기존 사용자 확인 또는 새 사용자 생성
            val user = findOrCreateUser(gitHubUser)
            
            // 4. 마지막 로그인 시간 업데이트
            user.updateLastLoginAt()
            val savedUser = userRepository.save(user)
            
            // 5. UserDto로 변환
            val userDto = UserDto(
                id = savedUser.id,
                email = savedUser.email,
                name = savedUser.name,
                provider = savedUser.provider.name,
                lastLoginAt = savedUser.lastLoginAt
            )
            
            return AuthResult.Success(userDto)
            
        } catch (e: Exception) {
            return AuthResult.Failure("GitHub 인증 실패: ${e.message}")
        }
    }
    
    private fun findOrCreateUser(gitHubUser: GitHubUserInfo): User {
        // 기존 사용자 확인
        val existingUser = userRepository.findByProviderAndProviderId(
            AuthProvider.GITHUB, 
            gitHubUser.id.toString()
        )
        
        if (existingUser != null) {
            return existingUser
        }
        
        // 새 사용자 생성
        val newUser = User(
            email = gitHubUser.email ?: "${gitHubUser.login}@github.com",
            provider = AuthProvider.GITHUB,
            providerId = gitHubUser.id.toString(),
            name = gitHubUser.name ?: gitHubUser.login
        )
        
        return userRepository.save(newUser)
    }
}

sealed class AuthResult {
    data class Success(val user: UserDto) : AuthResult()
    data class Failure(val message: String) : AuthResult()
}

data class UserDto(
    val id: Long?,
    val email: String,
    val name: String?,
    val provider: String,
    val lastLoginAt: java.time.LocalDateTime?
) 