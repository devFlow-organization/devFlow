package com.devflow.infrastructure.thread

import com.devflow.domain.thread.Thread
import com.devflow.domain.thread.ThreadRepository
import org.springframework.data.domain.PageRequest
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.data.mongodb.core.query.Update
import org.springframework.stereotype.Repository
import java.time.LocalDateTime

@Repository
class ThreadRepositoryImpl(
    private val threadMongoRepository: ThreadMongoRepository,
    private val mongoTemplate: MongoTemplate
) : ThreadRepository {
    
    override fun findByUserIdAndNotDeleted(userId: String, page: Int, limit: Int): List<Thread> {
        val pageable = PageRequest.of(page - 1, limit)
        return threadMongoRepository.findByUserIdAndDeletedFalseOrderByUpdatedAtDesc(userId, pageable)
    }
    
    override fun countByUserIdAndNotDeleted(userId: String): Long {
        return threadMongoRepository.countByUserIdAndDeletedFalse(userId)
    }
    
    override fun save(thread: Thread): Thread {
        return threadMongoRepository.save(thread)
    }
    
    override fun findByIdAndUserId(id: String, userId: String): Thread? {
        return threadMongoRepository.findByIdAndUserIdAndDeletedFalse(id, userId)
    }
    
    override fun markAsDeletedByIdAndUserId(id: String, userId: String) {
        val query = Query(Criteria.where("_id").`is`(id).and("user_id").`is`(userId))
        val update = Update().set("deleted", true).set("updated_at", LocalDateTime.now())
        mongoTemplate.updateFirst(query, update, Thread::class.java)
    }
    
    override fun markAllAsDeletedByUserId(userId: String) {
        val query = Query(Criteria.where("user_id").`is`(userId))
        val update = Update().set("deleted", true).set("updated_at", LocalDateTime.now())
        mongoTemplate.updateMulti(query, update, Thread::class.java)
    }
} 