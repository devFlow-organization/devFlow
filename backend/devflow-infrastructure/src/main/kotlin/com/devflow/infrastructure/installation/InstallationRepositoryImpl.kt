package com.devflow.infrastructure.installation

import com.devflow.domain.installation.Installation
import com.devflow.domain.installation.InstallationRepository
import org.springframework.stereotype.Component

@Component
class InstallationRepositoryImpl(
    private val jpaRepository: InstallationJpaRepository
) : InstallationRepository {

    override fun save(installation: Installation): Installation {
        return jpaRepository.save(installation)
    }

    override fun findById(id: Long): Installation? {
        return jpaRepository.findById(id).orElse(null)
    }
}