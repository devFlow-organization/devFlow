plugins {
    kotlin("plugin.spring")
}

dependencies {
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    implementation(project(":devflow-domain"))
    implementation(project(":devflow-infrastructure"))
    
    // Spring Boot Starter
    implementation("org.springframework.boot:spring-boot-starter:3.5.3")
    
    // Spring Data JPA (트랜잭션 지원)
    implementation("org.springframework.boot:spring-boot-starter-data-jpa:3.5.3")
    
    // Validation
    implementation("org.springframework.boot:spring-boot-starter-validation:3.5.3")

    // Jackson for JSON
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.16.0")

    // Test dependencies
    testImplementation("org.springframework.boot:spring-boot-starter-test:3.5.3")
    testImplementation("io.mockk:mockk:1.13.8")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit5:1.9.25")
    testImplementation(project(":devflow-domain"))
    testImplementation(project(":devflow-infrastructure"))
} 