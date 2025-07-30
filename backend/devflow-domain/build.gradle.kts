plugins {
    kotlin("plugin.jpa")
    kotlin("plugin.spring")
}

dependencies {
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    implementation(project(":devflow-common"))
    
    // JPA 어노테이션을 사용하기 위한 API 의존성
    implementation("jakarta.persistence:jakarta.persistence-api:3.1.0")
    
    // Spring 어노테이션을 사용하기 위한 Spring Context 의존성
    implementation("org.springframework:spring-context:6.1.0")
    
    // MongoDB 어노테이션을 사용하기 위한 의존성
    implementation("org.springframework.data:spring-data-mongodb:4.2.0")
} 