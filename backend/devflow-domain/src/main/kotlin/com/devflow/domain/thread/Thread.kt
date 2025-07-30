package com.devflow.domain.thread

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.Field
import java.time.LocalDateTime

@Document(collection = "threads")
class Thread(
    @Id
    val id: String? = null,
    
    @Field("title")
    var title: String = "New Thread",
    
    @Field("user_id")
    val userId: String,
    
    @Field("deleted")
    var deleted: Boolean = false,
    
    @Field("left_message_count")
    var leftMessageCount: Int = 25,
    
    @Field("created_at")
    val createdAt: LocalDateTime = LocalDateTime.now(),
    
    @Field("updated_at")
    var updatedAt: LocalDateTime = LocalDateTime.now()
) {
    fun markAsDeleted() {
        this.deleted = true
        this.updatedAt = LocalDateTime.now()
    }
    
    fun updateTitle(newTitle: String) {
        this.title = newTitle
        this.updatedAt = LocalDateTime.now()
    }
    
    fun updateLeftMessageCount(count: Int) {
        this.leftMessageCount = count
        this.updatedAt = LocalDateTime.now()
    }
    
    fun decrementLeftMessageCount() {
        if (this.leftMessageCount > 0) {
            this.leftMessageCount--
            this.updatedAt = LocalDateTime.now()
        }
    }
} 