package com.devflow.infrastructure.user

import com.devflow.domain.user.AuthProvider
import com.devflow.domain.user.User
import com.devflow.domain.user.UserRepository
import org.springframework.stereotype.Repository

@Repository
class UserRepositoryImpl(
    private val userMongoRepository: UserMongoRepository
) : UserRepository {
    
    override fun save(user: User): User {
        return userMongoRepository.save(user)
    }
    
    override fun findByEmail(email: String): User? {
        return userMongoRepository.findByEmail(email)
    }
    
    override fun findByProviderAndProviderId(provider: AuthProvider, providerId: String): User? {
        return userMongoRepository.findByProviderAndProviderId(provider, providerId)
    }
    
    override fun existsByEmail(email: String): Boolean {
        return userMongoRepository.existsByEmail(email)
    }
    
    override fun existsByProviderAndProviderId(provider: AuthProvider, providerId: String): Boolean {
        return userMongoRepository.existsByProviderAndProviderId(provider, providerId)
    }
} 