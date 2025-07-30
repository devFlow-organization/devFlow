package com.devflow.interfaces.auth

import com.devflow.application.auth.AuthService
import com.devflow.application.auth.AuthResult
import com.devflow.application.auth.UserDto
import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.test.context.TestPropertySource
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import java.time.LocalDateTime

@WebMvcTest(AuthController::class)
@TestPropertySource(locations = ["classpath:application-test.yml"])
class AuthControllerIntegrationTest {
    
    @Autowired
    private lateinit var mockMvc: MockMvc
    
    @Autowired
    private lateinit var objectMapper: ObjectMapper
    
    @MockBean
    private lateinit var authService: AuthService
    
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
    fun `should handle successful GitHub authentication`() {
        // Given
        val userDto = UserDto(
            id = 1L,
            email = "test@example.com",
            name = "Test User",
            provider = "GITHUB",
            lastLoginAt = LocalDateTime.now()
        )
        val successResult = AuthResult.Success(userDto)
        
        org.mockito.Mockito.`when`(authService.authenticateWithGitHub("valid_code"))
            .thenReturn(successResult)
        
        // When & Then
        mockMvc.perform(get("/api/auth/github/callback")
            .param("code", "valid_code"))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.success").value(true))
            .andExpect(jsonPath("$.user.email").value("test@example.com"))
            .andExpect(jsonPath("$.user.name").value("Test User"))
    }
    
    @Test
    fun `should handle failed GitHub authentication`() {
        // Given
        val failureResult = AuthResult.Failure("Invalid code")
        
        org.mockito.Mockito.`when`(authService.authenticateWithGitHub("invalid_code"))
            .thenReturn(failureResult)
        
        // When & Then
        mockMvc.perform(get("/api/auth/github/callback")
            .param("code", "invalid_code"))
            .andExpect(status().isBadRequest)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.success").value(false))
            .andExpect(jsonPath("$.message").value("Invalid code"))
    }
} 