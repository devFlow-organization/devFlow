package com.devflow

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
import org.springframework.boot.runApplication

@SpringBootApplication(exclude = [DataSourceAutoConfiguration::class])
class DevflowBackendApplication

fun main(args: Array<String>) {
	runApplication<DevflowBackendApplication>(*args)
} 