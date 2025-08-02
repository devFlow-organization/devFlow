package com.devflow.interfaces.webhook

import com.devflow.application.installation.GitHubAppInstallationService
import com.devflow.interfaces.webhook.model.GitHubEvent
import org.slf4j.LoggerFactory
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

    private val logger = LoggerFactory.getLogger(javaClass)

    @PostMapping
    fun handleGitHubWebhook(
        @RequestHeader("X-GitHub-Event") eventHeader: String, // 헤더는 문자열로 받습니다.
        @RequestHeader("X-Hub-Signature-256") signature: String,
        @RequestBody payload: String
    ): ResponseEntity<String> {

        verifySignature(signature, payload)

        val event = GitHubEvent.fromValue(eventHeader)
        when (event) {
            GitHubEvent.INSTALLATION -> installationService.processInstallationEvent(payload)
            GitHubEvent.INSTALLATION_REPOSITORIES -> installationService.processRepositoryEvent(payload)
            GitHubEvent.PUSH -> handlePushEvent(payload)
            GitHubEvent.PULL_REQUEST -> handlePullRequestEvent(payload)
            GitHubEvent.ISSUES -> handleIssuesEvent(payload)
            null -> {
                // 정의되지 않은 이벤트는 경고 로그를 남기고 무시합니다.
                logger.warn("Received an unhandled GitHub event: {}", eventHeader)
            }
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

    private fun handlePushEvent(payload: String) {
        logger.info("Processing push event...")
        // Push 이벤트 처리 로직
    }

    private fun handlePullRequestEvent(payload: String) {
        logger.info("Processing pull_request event...")
        // Pull Request 이벤트 처리 로직
    }

    private fun handleIssuesEvent(payload: String) {
        logger.info("Processing issues event...")
        // Issues 이벤트 처리 로직
    }
}