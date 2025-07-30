package com.devflow.application.auth

import com.devflow.domain.user.AuthProvider
import com.devflow.domain.user.User
import com.devflow.domain.user.UserRepository
import com.devflow.infrastructure.auth.GitHubOAuthClient
import com.devflow.infrastructure.auth.GitHubUserInfo
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.*
import java.time.LocalDateTime

class AuthServiceTest {
    
    private val userRepository: UserRepository = mockk()
    private val gitHubOAuthClient: GitHubOAuthClient = mockk()
    private val authService = AuthService(userRepository, gitHubOAuthClient)
    
    @Test
    fun `should authenticate new user with GitHub`() {
        // Given
        val code = "test_code"
        val gitHubUser = GitHubUserInfo(
            id = 12345L,
            login = "testuser",
            email = "test@example.com",
            name = "Test User",
            avatarUrl = "https://avatar.com/test.jpg"
        )
        
        every { gitHubOAuthClient.getAccessToken(code) } returns mockk()
        every { gitHubOAuthClient.getUserInfo(any()) } returns gitHubUser
        every { userRepository.findByProviderAndProviderId(AuthProvider.GITHUB, "12345") } returns null
        every { userRepository.save(any()) } answers { firstArg() }
        
        // When
        val result = authService.authenticateWithGitHub(code)
        
        // Then
        assertTrue(result is AuthResult.Success)
        val successResult = result as AuthResult.Success
        assertEquals("test@example.com", successResult.user.email)
        assertEquals("Test User", successResult.user.name)
        assertEquals("GITHUB", successResult.user.provider)
        
        verify { userRepository.save(any()) }
    }
    
    @Test
    fun `should authenticate existing user with GitHub`() {
        // Given
        val code = "test_code"
        val existingUser = User(
            id = 1L,
            email = "test@example.com",
            provider = AuthProvider.GITHUB,
            providerId = "12345",
            name = "Test User"
        )
        
        every { gitHubOAuthClient.getAccessToken(code) } returns mockk()
        every { gitHubOAuthClient.getUserInfo(any()) } returns GitHubUserInfo(
            id = 12345L,
            login = "testuser",
            email = "test@example.com",
            name = "Test User",
            avatarUrl = null
        )
        every { userRepository.findByProviderAndProviderId(AuthProvider.GITHUB, "12345") } returns existingUser
        every { userRepository.save(any()) } answers { firstArg() }
        
        // When
        val result = authService.authenticateWithGitHub(code)
        
        // Then
        assertTrue(result is AuthResult.Success)
        val successResult = result as AuthResult.Success
        assertEquals(existingUser.email, successResult.user.email)
        
        verify { userRepository.save(existingUser) }
    }
    
    @Test
    fun `should return failure when GitHub API fails`() {
        // Given
        val code = "invalid_code"
        every { gitHubOAuthClient.getAccessToken(code) } throws RuntimeException("API Error")
        
        // When
        val result = authService.authenticateWithGitHub(code)
        
        // Then
        assertTrue(result is AuthResult.Failure)
        val failureResult = result as AuthResult.Failure
        assertTrue(failureResult.message.contains("GitHub 인증 실패"))
    }
} 