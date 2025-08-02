package com.devflow.application.installation

import com.devflow.utils.JsonUtils
import com.fasterxml.jackson.annotation.JsonProperty
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service

@Service
class GitHubAppInstallationService(
    private val jsonUtils: JsonUtils,
) {
    private val logger = LoggerFactory.getLogger(javaClass)

    fun processInstallationEvent(payload: String) {
        val event = jsonUtils.toObject<InstallationEventPayload>(payload) ?: run {
            logger.error("Failed to parse installation event payload: $payload")
            return
        }

        when (event.action) {
            "created", "new_permissions_accepted" -> {
                logger.info("App installation created or permissions updated. Installation ID: ${event.installation.id}, Account: ${event.installation.account.login}")
                // TODO: 데이터베이스에 Installation 정보를 저장하거나 업데이트하는 로직을 구현해야함
            }
            "deleted" -> {
                logger.info("App installation deleted. Installation ID: ${event.installation.id}")
                // TODO: 데이터베이스에서 해당 Installation 정보를 삭제하거나 비활성 상태로 변경하는 로직을 구현합니다.
            }
            else -> {
                logger.warn("Unhandled installation action: ${event.action}")
            }
        }
    }

    fun processRepositoryEvent(payload: String) {
        // TODO: 앱에 연결된 저장소 목록이 변경되었을 때, DB의 정보를 동기화하는 로직을 구현합니다.
        logger.info("Installation repositories changed. Payload: $payload")
    }


    private data class InstallationEventPayload(
        val action: String,
        val installation: Installation,
    )

    private data class Installation(
        val id: Long,
        val account: Account,
        @JsonProperty("target_type") val targetType: String,
    )

    private data class Account(
        val login: String,
        val id: Long,
        @JsonProperty("node_id") val nodeId: String,
        @JsonProperty("avatar_url") val avatarUrl: String,
        val type: String
    )
}