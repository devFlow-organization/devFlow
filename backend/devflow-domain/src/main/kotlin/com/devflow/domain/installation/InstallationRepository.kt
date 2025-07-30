package com.devflow.domain.installation

interface InstallationRepository {

    fun save(installation: Installation): Installation

    fun findById(id: Long): Installation?
}