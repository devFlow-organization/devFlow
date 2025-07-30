package com.devflow.domain.message

interface MessageRepository {
    fun findByThreadIdAndRoleIn(threadId: String, roles: List<MessageRole>, page: Int, limit: Int): List<Message>
    fun countByThreadIdAndRoleIn(threadId: String, roles: List<MessageRole>): Long
    fun save(message: Message): Message
    fun findByThreadId(threadId: String): List<Message>
    fun deleteByThreadId(threadId: String)
} 