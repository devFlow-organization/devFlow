package com.devflow.interfaces.message.dto

import com.devflow.domain.message.MessageRole
import java.time.LocalDateTime

// Request DTOs
data class CreateMessageRequest(
    val threadId: String,
    val content: String,
    val role: MessageRole = MessageRole.USER
)

data class MessageListRequest(
    val threadId: String,
    val page: Int = 1,
    val limit: Int = 50
)

// Response DTOs
data class MessageResponse(
    val id: String,
    val content: String,
    val role: MessageRole,
    val createdAt: LocalDateTime
)

data class MessageListResponse(
    val data: List<MessageResponse>,
    val meta: MessageListMeta
)

data class MessageListMeta(
    val totalPages: Int,
    val total: Long
)

data class CreateMessageResponse(
    val id: String,
    val content: String,
    val role: MessageRole,
    val createdAt: LocalDateTime
) 