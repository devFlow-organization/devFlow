package com.devflow.domain.user

interface UserRepository {
    fun save(user: User): User
    fun findByEmail(email: String): User?
    fun findByProviderAndProviderId(provider: AuthProvider, providerId: String): User?
    fun existsByEmail(email: String): Boolean
    fun existsByProviderAndProviderId(provider: AuthProvider, providerId: String): Boolean
} 