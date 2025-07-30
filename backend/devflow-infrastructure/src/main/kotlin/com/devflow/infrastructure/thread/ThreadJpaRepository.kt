package com.devflow.infrastructure.thread

import com.devflow.domain.thread.Thread
import org.springframework.data.domain.Pageable
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface ThreadMongoRepository : MongoRepository<Thread, String> {
    
    @Query("{ 'user_id': ?0, 'deleted': false }")
    fun findByUserIdAndDeletedFalseOrderByUpdatedAtDesc(
        userId: String,
        pageable: Pageable
    ): List<Thread>
    
    @Query(value = "{ 'user_id': ?0, 'deleted': false }", count = true)
    fun countByUserIdAndDeletedFalse(userId: String): Long
    
    @Query("{ '_id': ?0, 'user_id': ?1, 'deleted': false }")
    fun findByIdAndUserIdAndDeletedFalse(
        id: String,
        userId: String
    ): Thread?
    
    @Query("{ '_id': ?0, 'user_id': ?1 }")
    fun findByIdAndUserId(
        id: String,
        userId: String
    ): Thread?
} 