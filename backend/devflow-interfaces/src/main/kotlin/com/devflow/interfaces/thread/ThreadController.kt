package com.devflow.interfaces.thread

import com.devflow.application.thread.ThreadService
import com.devflow.interfaces.thread.dto.*
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import jakarta.servlet.http.HttpSession

@RestController
@RequestMapping("/api/thread")
class ThreadController(
    private val threadService: ThreadService
) {
    
    @GetMapping("/list")
    fun getThreadList(
        @RequestParam(defaultValue = "1") page: Int,
        @RequestParam(defaultValue = "50") limit: Int,
        session: HttpSession
    ): ResponseEntity<ThreadListResponse> {
        val userId = session.getAttribute("userId") as? String
            ?: return ResponseEntity.status(401).build()
        
        val request = com.devflow.application.thread.dto.ThreadListRequest(page = page, limit = limit)
        val response = threadService.getThreadList(userId, request)
        
        // DTO 변환
        val interfaceResponse = ThreadListResponse(
            data = response.data.map { appDto ->
                ThreadResponse(
                    threadId = appDto.threadId,
                    title = appDto.title
                )
            },
            meta = ThreadListMeta(
                totalPages = response.meta.totalPages,
                total = response.meta.total
            )
        )
        
        return ResponseEntity.ok(interfaceResponse)
    }
    
    @PostMapping("/create")
    fun createThread(
        @RequestBody request: CreateThreadRequest,
        session: HttpSession
    ): ResponseEntity<ThreadResponse> {
        val userId = session.getAttribute("userId") as? String
            ?: return ResponseEntity.status(401).build()
        
        // DTO 변환
        val appRequest = com.devflow.application.thread.dto.CreateThreadRequest(
            title = request.title
        )
        
        val response = threadService.createThread(userId, appRequest)
        
        // DTO 변환
        val interfaceResponse = ThreadResponse(
            threadId = response.threadId,
            title = response.title
        )
        
        return ResponseEntity.ok(interfaceResponse)
    }
    
    @DeleteMapping("/delete")
    fun deleteThread(
        @RequestBody request: DeleteThreadRequest,
        session: HttpSession
    ): ResponseEntity<DeleteThreadResponse> {
        val userId = session.getAttribute("userId") as? String
            ?: return ResponseEntity.status(401).build()
        
        // DTO 변환
        val appRequest = com.devflow.application.thread.dto.DeleteThreadRequest(
            threadId = request.threadId
        )
        
        val response = threadService.deleteThread(userId, appRequest)
        
        // DTO 변환
        val interfaceResponse = DeleteThreadResponse(
            message = response.message
        )
        
        return ResponseEntity.ok(interfaceResponse)
    }
    
    @DeleteMapping("/delete-all")
    fun deleteAllThreads(
        @RequestBody request: DeleteAllThreadsRequest,
        session: HttpSession
    ): ResponseEntity<DeleteAllThreadsResponse> {
        val userId = session.getAttribute("userId") as? String
            ?: return ResponseEntity.status(401).build()
        
        // DTO 변환
        val appRequest = com.devflow.application.thread.dto.DeleteAllThreadsRequest(
            dummy = request.dummy
        )
        
        val response = threadService.deleteAllThreads(userId, appRequest)
        
        // DTO 변환
        val interfaceResponse = DeleteAllThreadsResponse(
            message = response.message
        )
        
        return ResponseEntity.ok(interfaceResponse)
    }
} 