package com.devflow.infrastructure.installation

import com.devflow.domain.github.installation.GitHubInstallation
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
interface InstallationJpaRepository : MongoRepository<GitHubInstallation, Long> {
    // JpaRepository가 기본적인 save(), findById() 등을 모두 제공합니다.
}