package com.devflow.interfaces.webhook.model

enum class GitHubEvent(val value: String) {
    INSTALLATION("installation"),
    INSTALLATION_REPOSITORIES("installation_repositories"),
    PUSH("push"),
    PULL_REQUEST("pull_request"),
    ISSUES("issues");

    companion object {
        fun fromValue(value: String): GitHubEvent? {
            // values() 대신 entries를 사용하는 것이 성능상 더 효율적입니다.
            return entries.find { it.value.equals(value, ignoreCase = true) }
        }
    }
}