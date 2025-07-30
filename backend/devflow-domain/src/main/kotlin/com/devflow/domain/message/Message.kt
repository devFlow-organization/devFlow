package com.devflow.domain.message

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.Field
import java.time.LocalDateTime

@Document(collection = "messages")
class Message(
    @Id
    val id: String? = null,
    
    @Field("thread_id")
    val threadId: String,
    
    @Field("content")
    var content: String? = null,
    
    @Field("role")
    val role: MessageRole,
    
    @Field("created_at")
    val createdAt: LocalDateTime = LocalDateTime.now(),
    
    @Field("updated_at")
    var updatedAt: LocalDateTime = LocalDateTime.now()
) {
    fun updateContent(newContent: String) {
        this.content = newContent
        this.updatedAt = LocalDateTime.now()
    }
}

enum class MessageRole {
    USER,
    ASSISTANT
} 