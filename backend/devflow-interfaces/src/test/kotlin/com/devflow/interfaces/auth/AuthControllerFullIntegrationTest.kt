package com.devflow.interfaces.auth

import com.devflow.application.auth.AuthService
import com.devflow.domain.user.AuthProvider
import com.devflow.domain.user.User
import com.devflow.domain.user.UserRepository
import com.devflow.infrastructure.auth.GitHubOAuthClient
import com.devflow.infrastructure.auth.GitHubAccessTokenResponse
import com.devflow.infrastructure.auth.GitHubUserInfo
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.test.context.TestPropertySource
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import org.springframework.http.MediaType
import org.mockito.Mockito.`when`
import org.springframework.transaction.annotation.Transactional

@SpringBootTest
@TestPropertySource(locations = ["classpath:application-test.yml"])
@Transactional
class AuthControllerFullIntegrationTest {
    
    @Autowired
    private lateinit var webApplicationContext: WebApplicationContext
    
    @Autowired
    private lateinit var userRepository: UserRepository
    
    @MockBean
    private lateinit var gitHubOAuthClient: GitHubOAuthClient
    
    private lateinit var mockMvc: MockMvc
    
    @BeforeEach
    fun setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build()
    }
    
    @Test
    fun `should return GitHub login URL`() {
        // When & Then
        mockMvc.perform(get("/api/auth/github/login"))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.loginUrl").exists())
            .andExpect(jsonPath("$.loginUrl").value(org.hamcrest.Matchers.containsString("github.com")))
    }
    
    @Test
    fun `should authenticate new user with GitHub and save to database`() {
        // Given
        val code = "valid_code"
        val gitHubUser = GitHubUserInfo(
            id = 12345L,
            login = "testuser",
            email = "test@example.com",
            name = "Test User",
            avatarUrl = "https://avatar.com/test.jpg"
        )
        
        val tokenResponse = GitHubAccessTokenResponse(
            accessToken = "test_token",
            tokenType = "bearer",
            scope = "user:email"
        )
        
        `when`(gitHubOAuthClient.getAccessToken(code)).thenReturn(tokenResponse)
        `when`(gitHubOAuthClient.getUserInfo("test_token")).thenReturn(gitHubUser)
        
        // When & Then
        mockMvc.perform(get("/api/auth/github/callback")
            .param("code", code))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.success").value(true))
            .andExpect(jsonPath("$.user.email").value("test@example.com"))
            .andExpect(jsonPath("$.user.name").value("Test User"))
            .andExpect(jsonPath("$.user.provider").value("GITHUB"))
        
        // Verify user was saved to database
        val savedUser = userRepository.findByProviderAndProviderId(AuthProvider.GITHUB, "12345")
        assert(savedUser != null)
        assert(savedUser!!.email == "test@example.com")
        assert(savedUser.name == "Test User")
    }
    
    @Test
    fun `should authenticate existing user with GitHub`() {
        // Given - Create existing user
        val existingUser = User(
            email = "existing@example.com",
            provider = AuthProvider.GITHUB,
            providerId = "12345",
            name = "Existing User"
        )
        userRepository.save(existingUser)
        
        val code = "valid_code"
        val gitHubUser = GitHubUserInfo(
            id = 12345L,
            login = "existinguser",
            email = "existing@example.com",
            name = "Existing User",
            avatarUrl = null
        )
        
        val tokenResponse = GitHubAccessTokenResponse(
            accessToken = "test_token",
            tokenType = "bearer",
            scope = "user:email"
        )
        
        `when`(gitHubOAuthClient.getAccessToken(code)).thenReturn(tokenResponse)
        `when`(gitHubOAuthClient.getUserInfo("test_token")).thenReturn(gitHubUser)
        
        // When & Then
        mockMvc.perform(get("/api/auth/github/callback")
            .param("code", code))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.success").value(true))
            .andExpect(jsonPath("$.user.email").value("existing@example.com"))
    }
    
    @Test
    fun `should handle GitHub API failure`() {
        // Given
        val code = "invalid_code"
        `when`(gitHubOAuthClient.getAccessToken(code))
            .thenThrow(RuntimeException("GitHub API Error"))
        
        // When & Then
        mockMvc.perform(get("/api/auth/github/callback")
            .param("code", code))
            .andExpect(status().isBadRequest)
            .andExpect(jsonPath("$.success").value(false))
            .andExpect(jsonPath("$.message").value(org.hamcrest.Matchers.containsString("GitHub 인증 실패")))
    }
} 