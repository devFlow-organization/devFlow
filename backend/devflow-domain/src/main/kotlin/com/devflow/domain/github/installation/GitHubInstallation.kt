package com.devflow.domain.github.installation

import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.Id
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.Field
import java.time.LocalDateTime

@Document(collection = "github_installations")
data class GitHubInstallation(
    @Id
    val id: Long,

    @Field("account_login")
    val accountLogin: String,

    @Field("account_type")
    val accountType: String,

    @Field("avatar_url")
    val avatarUrl: String?,

    @Field("status")
    var status: InstallationStatus,

    // Spring Data MongoDB Auditing 기능으로 자동 생성됩니다.
    @CreatedDate
    @Field("created_at")
    val createdAt: LocalDateTime? = null,

    // Spring Data MongoDB Auditing 기능으로 자동 업데이트됩니다.
    @LastModifiedDate
    @Field("updated_at")
    var updatedAt: LocalDateTime? = null
)

enum class InstallationStatus {
    ACTIVE,
    SUSPENDED,
    DELETED
}