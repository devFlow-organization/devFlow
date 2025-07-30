package com.devflow.interfaces.auth

import com.devflow.domain.user.AuthProvider
import com.devflow.domain.user.User
import com.devflow.domain.user.UserRepository
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.TestPropertySource
import org.springframework.transaction.annotation.Transactional
import org.junit.jupiter.api.Assertions.*

@SpringBootTest
@TestPropertySource(locations = ["classpath:application-test.yml"])
@Transactional
class SimpleIntegrationTest {
    
    @Autowired
    private lateinit var userRepository: UserRepository
    
    @Test
    fun `should save and find user in database`() {
        // Given
        val user = User(
            email = "test@example.com",
            provider = AuthProvider.GITHUB,
            providerId = "12345",
            name = "Test User"
        )
        
        // When
        val savedUser = userRepository.save(user)
        val foundUser = userRepository.findByEmail("test@example.com")
        
        // Then
        assertNotNull(savedUser.id)
        assertNotNull(foundUser)
        assertEquals("test@example.com", foundUser!!.email)
        assertEquals(AuthProvider.GITHUB, foundUser.provider)
    }
    
    @Test
    fun `should find user by provider and provider id`() {
        // Given
        val user = User(
            email = "test2@example.com",
            provider = AuthProvider.GITHUB,
            providerId = "67890",
            name = "Test User 2"
        )
        userRepository.save(user)
        
        // When
        val foundUser = userRepository.findByProviderAndProviderId(AuthProvider.GITHUB, "67890")
        
        // Then
        assertNotNull(foundUser)
        assertEquals("test2@example.com", foundUser!!.email)
    }
} 