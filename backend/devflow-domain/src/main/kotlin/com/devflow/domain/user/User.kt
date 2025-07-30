package com.devflow.domain.user

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.Field
import java.time.LocalDateTime

@Document(collection = "users")
class User(
    @Id
    val id: String? = null,
    
    @Field("email")
    val email: String,
    
    @Field("provider")
    val provider: AuthProvider,
    
    @Field("provider_id")
    val providerId: String,
    
    @Field("name")
    val name: String? = null,
    
    @Field("last_login_at")
    var lastLoginAt: LocalDateTime? = null,
    
    @Field("created_at")
    val createdAt: LocalDateTime = LocalDateTime.now(),
    
    @Field("updated_at")
    var updatedAt: LocalDateTime = LocalDateTime.now()
) {
    fun updateLastLogin() {
        this.updatedAt = LocalDateTime.now()
    }
    
    fun updateLastLoginAt() {
        this.lastLoginAt = LocalDateTime.now()
        this.updatedAt = LocalDateTime.now()
    }
} 