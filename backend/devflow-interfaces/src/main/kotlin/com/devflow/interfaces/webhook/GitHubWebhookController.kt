package com.devflow.interfaces.webhook

import com.devflow.application.installation.GitHubAppInstallationService
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.security.MessageDigest
import javax.crypto.Mac
import javax.crypto.spec.SecretKeySpec

@RestController
@RequestMapping("/api/webhooks/github")
class GitHubWebhookController(
    private val installationService: GitHubAppInstallationService
) {
    @Value("\${github.app.webhook-secret}")
    private lateinit var webhookSecret: String

    @PostMapping
    fun handleGitHubWebhook(
        @RequestHeader("X-GitHub-Event") event: String,
        @RequestHeader("X-Hub-Signature-256") signature: String,
        @RequestBody payload: String
    ): ResponseEntity<String> {

        verifySignature(signature, payload)

        when (event) {
            "installation" -> installationService.processInstallationEvent(payload)
            "installation_repositories" -> installationService.processRepositoryEvent(payload)
            "push" -> handlePushEvent(payload)
            "pull_request" -> handlePullRequestEvent(payload)
            "issues" -> handleIssuesEvent(payload)
            // TODO: 필요한 다른 이벤트들(예: pull_request) 처리
            else -> ResponseEntity.ok("Event $event received")
        }

        return ResponseEntity.ok("Webhook received successfully")
    }

    private fun verifySignature(signature: String, payload: String) {
        val algorithm = "HmacSHA256"
        val secretKeySpec = SecretKeySpec(webhookSecret.toByteArray(), algorithm)
        val mac = Mac.getInstance(algorithm)
        mac.init(secretKeySpec)
        val hash = mac.doFinal(payload.toByteArray())
        val expectedSignature = "sha256=" + hash.joinToString("") { "%02x".format(it) }

        if (!MessageDigest.isEqual(signature.toByteArray(), expectedSignature.toByteArray())) {
            throw SecurityException("Invalid GitHub webhook signature.")
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