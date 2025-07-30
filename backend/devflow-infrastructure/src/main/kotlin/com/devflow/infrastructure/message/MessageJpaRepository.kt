package com.devflow.infrastructure.message

import com.devflow.domain.message.Message
import com.devflow.domain.message.MessageRole
import org.springframework.data.domain.Pageable
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface MessageMongoRepository : MongoRepository<Message, String> {
    
    @Query("{ 'thread_id': ?0, 'role': { \$in: ?1 } }")
    fun findByThreadIdAndRoleInOrderByCreatedAtDesc(
        threadId: String,
        roles: List<MessageRole>,
        pageable: Pageable
    ): List<Message>
    
    @Query(value = "{ 'thread_id': ?0, 'role': { \$in: ?1 } }", count = true)
    fun countByThreadIdAndRoleIn(
        threadId: String,
        roles: List<MessageRole>
    ): Long
    
    @Query("{ 'thread_id': ?0 }")
    fun findByThreadIdOrderByCreatedAtAsc(threadId: String): List<Message>
} 