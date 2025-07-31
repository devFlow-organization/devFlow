package com.devflow.infrastructure.installation

import com.devflow.domain.github.installation.GitHubInstallation
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface InstallationJpaRepository : JpaRepository<GitHubInstallation, Long> {
    // JpaRepository가 기본적인 save(), findById() 등을 모두 제공합니다.
}