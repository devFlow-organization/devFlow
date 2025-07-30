plugins {
    kotlin("plugin.jpa")
    kotlin("plugin.spring")
}

dependencies {
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    implementation(project(":devflow-domain"))
    
    // Spring Data MongoDB
    implementation("org.springframework.boot:spring-boot-starter-data-mongodb:3.5.3")
    
    // Spring Web (RestTemplate 사용을 위해)
    implementation("org.springframework.boot:spring-boot-starter-web:3.5.3")
    
    // Spring Boot Starter
    implementation("org.springframework.boot:spring-boot-starter:3.5.3")
} 