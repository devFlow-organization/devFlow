package com.devflow.interfaces.message

import com.devflow.application.message.MessageService
import com.devflow.interfaces.message.dto.*
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import jakarta.servlet.http.HttpSession

@RestController
@RequestMapping("/api/message")
class MessageController(
    private val messageService: MessageService
) {
    
    @GetMapping("/list")
    fun getMessageList(
        @RequestParam threadId: String,
        @RequestParam(defaultValue = "1") page: Int,
        @RequestParam(defaultValue = "50") limit: Int,
        session: HttpSession
    ): ResponseEntity<com.devflow.interfaces.message.dto.MessageListResponse> {
        val userId = session.getAttribute("userId") as? String
            ?: return ResponseEntity.status(401).build()
        
        val request = com.devflow.application.message.dto.MessageListRequest(threadId = threadId, page = page, limit = limit)
        val response = messageService.getMessageList(userId, request)
        
        // DTO 변환
        val interfaceResponse = com.devflow.interfaces.message.dto.MessageListResponse(
            data = response.data.map { appDto ->
                com.devflow.interfaces.message.dto.MessageResponse(
                    id = appDto.id,
                    content = appDto.content,
                    role = appDto.role,
                    createdAt = appDto.createdAt
                )
            },
            meta = com.devflow.interfaces.message.dto.MessageListMeta(
                totalPages = response.meta.totalPages,
                total = response.meta.total
            )
        )
        
        return ResponseEntity.ok(interfaceResponse)
    }
    
    @PostMapping("/create")
    fun createMessage(
        @RequestBody request: com.devflow.interfaces.message.dto.CreateMessageRequest,
        session: HttpSession
    ): ResponseEntity<com.devflow.interfaces.message.dto.CreateMessageResponse> {
        val userId = session.getAttribute("userId") as? String
            ?: return ResponseEntity.status(401).build()
        
        // DTO 변환
        val appRequest = com.devflow.application.message.dto.CreateMessageRequest(
            threadId = request.threadId,
            content = request.content,
            role = request.role
        )
        
        val response = messageService.createMessage(userId, appRequest)
        
        // DTO 변환
        val interfaceResponse = com.devflow.interfaces.message.dto.CreateMessageResponse(
            id = response.id,
            content = response.content,
            role = response.role,
            createdAt = response.createdAt
        )
        
        return ResponseEntity.ok(interfaceResponse)
    }
    
    @DeleteMapping("/delete/{threadId}")
    fun deleteMessagesByThreadId(
        @PathVariable threadId: String,
        session: HttpSession
    ): ResponseEntity<Map<String, String>> {
        val userId = session.getAttribute("userId") as? String
            ?: return ResponseEntity.status(401).build()
        
        messageService.deleteMessagesByThreadId(userId, threadId)
        
        return ResponseEntity.ok(mapOf("message" to "Messages deleted successfully"))
    }
} 