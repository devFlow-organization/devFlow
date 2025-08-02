package com.devflow.infrastructure.installation

import com.devflow.domain.github.installation.GitHubInstallation
import com.devflow.domain.github.installation.InstallationRepository
import org.springframework.stereotype.Component

@Component
class InstallationRepositoryImpl(
    private val jpaRepository: InstallationJpaRepository
) : InstallationRepository {

    override fun save(gitHubInstallation: GitHubInstallation): GitHubInstallation {
        return jpaRepository.save(gitHubInstallation)
    }

    override fun findById(id: Long): GitHubInstallation? {
        return jpaRepository.findById(id).orElse(null)
    }
}