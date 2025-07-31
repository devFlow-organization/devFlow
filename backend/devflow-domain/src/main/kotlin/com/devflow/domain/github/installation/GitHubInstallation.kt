package com.devflow.domain.github.installation

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "github_installations")
class GitHubInstallation(
    @Id
    val id: Long, // GitHub Installation ID를 Primary Key로 사용

    @Column(nullable = false)
    val installationId: Long,

    @Column(nullable = false)
    val accountLogin: String,

    @Column(nullable = false)
    val accountType: String,

    @Column
    val avatarUrl: String?,

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    var status: InstallationStatus,

    @Column(nullable = false, updatable = false)
    val createdAt: LocalDateTime = LocalDateTime.now(),

    @Column(nullable = false)
    var updatedAt: LocalDateTime = LocalDateTime.now()
)

enum class InstallationStatus {
    ACTIVE,
    SUSPENDED,
    DELETED
}