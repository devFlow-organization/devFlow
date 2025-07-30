package com.devflow.infrastructure.user

import com.devflow.domain.user.AuthProvider
import com.devflow.domain.user.User
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
interface UserMongoRepository : MongoRepository<User, String> {
    fun findByEmail(email: String): User?
    fun findByProviderAndProviderId(provider: AuthProvider, providerId: String): User?
    fun existsByEmail(email: String): Boolean
    fun existsByProviderAndProviderId(provider: AuthProvider, providerId: String): Boolean
} 