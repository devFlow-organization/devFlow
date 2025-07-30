package com.devflow.domain.thread

interface ThreadRepository {
    fun findByUserIdAndNotDeleted(userId: String, page: Int, limit: Int): List<Thread>
    fun countByUserIdAndNotDeleted(userId: String): Long
    fun save(thread: Thread): Thread
    fun findByIdAndUserId(id: String, userId: String): Thread?
    fun markAsDeletedByIdAndUserId(id: String, userId: String)
    fun markAllAsDeletedByUserId(userId: String)
} 