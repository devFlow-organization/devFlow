package com.devflow.infrastructure.message

import com.devflow.domain.message.Message
import com.devflow.domain.message.MessageRepository
import com.devflow.domain.message.MessageRole
import org.springframework.data.domain.PageRequest
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.stereotype.Repository

@Repository
class MessageRepositoryImpl(
    private val messageMongoRepository: MessageMongoRepository,
    private val mongoTemplate: MongoTemplate
) : MessageRepository {
    
    override fun findByThreadIdAndRoleIn(threadId: String, roles: List<MessageRole>, page: Int, limit: Int): List<Message> {
        val pageable = PageRequest.of(page - 1, limit)
        return messageMongoRepository.findByThreadIdAndRoleInOrderByCreatedAtDesc(threadId, roles, pageable)
    }
    
    override fun countByThreadIdAndRoleIn(threadId: String, roles: List<MessageRole>): Long {
        return messageMongoRepository.countByThreadIdAndRoleIn(threadId, roles)
    }
    
    override fun save(message: Message): Message {
        return messageMongoRepository.save(message)
    }
    
    override fun findByThreadId(threadId: String): List<Message> {
        return messageMongoRepository.findByThreadIdOrderByCreatedAtAsc(threadId)
    }
    
    override fun deleteByThreadId(threadId: String) {
        val query = Query(Criteria.where("thread_id").`is`(threadId))
        mongoTemplate.remove(query, Message::class.java)
    }
} 