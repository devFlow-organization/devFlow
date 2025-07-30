plugins {
    id("org.springframework.boot") version "3.5.3"
    kotlin("plugin.spring")
}

dependencies {
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    implementation(project(":devflow-application"))
    implementation(project(":devflow-domain"))
    implementation(project(":devflow-infrastructure"))

    // Spring Boot Web Starter
    implementation("org.springframework.boot:spring-boot-starter-web:3.5.3")

    // Spring Security (CORS 지원을 위해)
    implementation("org.springframework.boot:spring-boot-starter-security:3.5.3")

    // Spring Boot DevTools (자동 재시작)
    developmentOnly("org.springframework.boot:spring-boot-devtools:3.5.3")

    // Jackson for JSON
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.16.0")

    // Kotlin Reflect
    implementation("org.jetbrains.kotlin:kotlin-reflect:1.9.25")

    // Test dependencies
    testImplementation("org.springframework.boot:spring-boot-starter-test:3.5.3")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit5:1.9.25")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher:1.11.0")
}

tasks.withType<Test> {
    useJUnitPlatform()
} 