package com.devflow.application.auth

import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.*

class SimpleTest {
    
    @Test
    fun `should pass simple test`() {
        // Given
        val expected = "Hello"
        
        // When
        val actual = "Hello"
        
        // Then
        assertEquals(expected, actual)
    }
    
    @Test
    fun `should test basic math`() {
        assertEquals(4, 2 + 2)
        assertTrue(5 > 3)
    }
} 