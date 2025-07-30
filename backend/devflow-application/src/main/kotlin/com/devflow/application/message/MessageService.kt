package com.devflow.application.message

import com.devflow.domain.message.Message
import com.devflow.domain.message.MessageRepository
import com.devflow.domain.message.MessageRole
import com.devflow.domain.thread.ThreadRepository
import com.devflow.application.message.dto.*
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import kotlin.math.ceil

@Service
@Transactional
class MessageService(
    private val messageRepository: MessageRepository,
    private val threadRepository: ThreadRepository
) {
    
    @Transactional(readOnly = true)
    fun getMessageList(userId: String, request: MessageListRequest): MessageListResponse {
        val threadId = request.threadId
        val page = request.page
        val limit = request.limit
        
        // Thread가 해당 사용자의 것인지 확인
        val thread = threadRepository.findByIdAndUserId(threadId, userId)
            ?: throw IllegalArgumentException("Thread not found or access denied")
        
        val roles = listOf(MessageRole.USER, MessageRole.ASSISTANT)
        val messages = messageRepository.findByThreadIdAndRoleIn(threadId, roles, page, limit)
        val total = messageRepository.countByThreadIdAndRoleIn(threadId, roles)
        val totalPages = ceil(total.toDouble() / limit.toDouble()).toInt()
        
        val data = messages.map { message ->
            MessageResponse(
                id = message.id!!,
                content = message.content ?: "",
                role = message.role,
                createdAt = message.createdAt
            )
        }
        
        return MessageListResponse(
            data = data,
            meta = MessageListMeta(
                totalPages = totalPages,
                total = total
            )
        )
    }
    
    fun createMessage(userId: String, request: CreateMessageRequest): CreateMessageResponse {
        val threadId = request.threadId
        val content = request.content
        val role = request.role
        
        // Thread가 해당 사용자의 것인지 확인
        val thread = threadRepository.findByIdAndUserId(threadId, userId)
            ?: throw IllegalArgumentException("Thread not found or access denied")
        
        val message = Message(
            threadId = threadId,
            content = content,
            role = role
        )
        
        val savedMessage = messageRepository.save(message)
        
        return CreateMessageResponse(
            id = savedMessage.id!!,
            content = savedMessage.content ?: "",
            role = savedMessage.role,
            createdAt = savedMessage.createdAt
        )
    }
    
    fun deleteMessagesByThreadId(userId: String, threadId: String) {
        // Thread가 해당 사용자의 것인지 확인
        val thread = threadRepository.findByIdAndUserId(threadId, userId)
            ?: throw IllegalArgumentException("Thread not found or access denied")
        
        messageRepository.deleteByThreadId(threadId)
    }
} 