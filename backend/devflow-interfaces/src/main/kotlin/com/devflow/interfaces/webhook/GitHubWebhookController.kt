package com.devflow.interfaces.webhook

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/webhooks/github")
class GitHubWebhookController {

    @PostMapping
    fun handleGitHubWebhook(
        @RequestHeader("X-GitHub-Event") event: String,
        @RequestBody payload: String
    ): ResponseEntity<String> {
        
        return when (event) {
            "push" -> handlePushEvent(payload)
            "pull_request" -> handlePullRequestEvent(payload)
            "issues" -> handleIssuesEvent(payload)
            else -> ResponseEntity.ok("Event $event received")
        }
    }

    private fun handlePushEvent(payload: String): ResponseEntity<String> {
        // Push 이벤트 처리 로직
        return ResponseEntity.ok("Push event processed")
    }

    private fun handlePullRequestEvent(payload: String): ResponseEntity<String> {
        // Pull Request 이벤트 처리 로직
        return ResponseEntity.ok("Pull request event processed")
    }

    private fun handleIssuesEvent(payload: String): ResponseEntity<String> {
        // Issues 이벤트 처리 로직
        return ResponseEntity.ok("Issues event processed")
    }
} 