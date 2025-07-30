package com.devflow.interfaces.thread.dto

import java.time.LocalDateTime

// Request DTOs
data class CreateThreadRequest(
    val title: String = "New Thread"
)

data class ThreadListRequest(
    val page: Int = 1,
    val limit: Int = 50
)

data class DeleteThreadRequest(
    val threadId: String
)

data class DeleteAllThreadsRequest(
    val dummy: String = ""
)

// Response DTOs
data class ThreadResponse(
    val threadId: String,
    val title: String
)

data class ThreadListResponse(
    val data: List<ThreadResponse>,
    val meta: ThreadListMeta
)

data class ThreadListMeta(
    val totalPages: Int,
    val total: Long
)

data class DeleteThreadResponse(
    val message: String = "Thread deleted successfully"
)

data class DeleteAllThreadsResponse(
    val message: String = "All threads deleted successfully"
) 