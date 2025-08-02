plugins {
    val kotlinVersion = "1.9.24"
    val springBootVersion = "3.3.1"

    kotlin("jvm") version kotlinVersion apply false
    kotlin("plugin.spring") version kotlinVersion apply false
    kotlin("plugin.jpa") version kotlinVersion apply false
    kotlin("kapt") version kotlinVersion apply false
    id("org.springframework.boot") version springBootVersion apply false
    id("io.spring.dependency-management") version "1.1.7" apply false
}

group = "com.devflow"
version = "0.0.1-SNAPSHOT"

allprojects {
    repositories {
        mavenCentral()
    }
}

subprojects {
    group = "com.devflow"
    version = "0.0.1-SNAPSHOT"
}

tasks.withType<Test> {
    useJUnitPlatform()
}
