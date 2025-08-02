package com.devflow.domain.github.installation

interface InstallationRepository {

    fun save(gitHubInstallation: GitHubInstallation): GitHubInstallation

    fun findById(id: Long): GitHubInstallation?
}