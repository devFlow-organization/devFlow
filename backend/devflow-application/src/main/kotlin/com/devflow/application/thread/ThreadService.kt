package com.devflow.application.thread

import com.devflow.domain.thread.Thread
import com.devflow.domain.thread.ThreadRepository
import com.devflow.application.thread.dto.*
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import kotlin.math.ceil

@Service
@Transactional
class ThreadService(
    private val threadRepository: ThreadRepository
) {
    
    @Transactional(readOnly = true)
    fun getThreadList(userId: String, request: ThreadListRequest): ThreadListResponse {
        val page = request.page
        val limit = request.limit
        
        val threads = threadRepository.findByUserIdAndNotDeleted(userId, page, limit)
        val total = threadRepository.countByUserIdAndNotDeleted(userId)
        val totalPages = ceil(total.toDouble() / limit.toDouble()).toInt()
        
        val data = threads.map { thread ->
            ThreadResponse(
                threadId = thread.id!!,
                title = thread.title
            )
        }
        
        return ThreadListResponse(
            data = data,
            meta = ThreadListMeta(
                totalPages = totalPages,
                total = total
            )
        )
    }
    
    fun createThread(userId: String, request: CreateThreadRequest): ThreadResponse {
        val thread = Thread(
            title = request.title,
            userId = userId
        )
        
        val savedThread = threadRepository.save(thread)
        
        return ThreadResponse(
            threadId = savedThread.id!!,
            title = savedThread.title
        )
    }
    
    fun deleteThread(userId: String, request: DeleteThreadRequest): DeleteThreadResponse {
        val thread = threadRepository.findByIdAndUserId(request.threadId, userId)
            ?: throw IllegalArgumentException("Thread not found or access denied")
        
        threadRepository.markAsDeletedByIdAndUserId(request.threadId, userId)
        
        return DeleteThreadResponse()
    }
    
    fun deleteAllThreads(userId: String, request: DeleteAllThreadsRequest): DeleteAllThreadsResponse {
        threadRepository.markAllAsDeletedByUserId(userId)
        
        return DeleteAllThreadsResponse()
    }
} 