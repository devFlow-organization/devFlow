plugins {
    kotlin("jvm")
    kotlin("plugin.spring")
    kotlin("plugin.jpa")
    id("io.spring.dependency-management")
}

the<io.spring.gradle.dependencymanagement.dsl.DependencyManagementExtension>().apply {
    imports {
        mavenBom("org.springframework.boot:spring-boot-dependencies:3.3.1")
    }
}

dependencies {
    implementation(project(":devflow-domain"))
    implementation(project(":devflow-common"))

    // ==========================================
    // JWT 관련 의존성
    // ==========================================
    implementation("io.jsonwebtoken:jjwt-api:0.12.6")
    runtimeOnly("io.jsonwebtoken:jjwt-impl:0.12.6")
    runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.12.6")

    // ==========================================
    // Spring 의존성 (HttpHeaders 충돌 방지)
    // ==========================================
    implementation("org.springframework.boot:spring-boot-starter-web") {
        // Apache HttpClient 제외 (필요시)
        // exclude(group = "org.apache.httpcomponents", module = "httpclient")
    }

    implementation("org.springframework:spring-tx")
    implementation("org.springframework:spring-context")

    // ==========================================
    // HTTP 클라이언트 (선택사항)
    // ==========================================
    // Apache HttpClient5를 사용하려면 아래 주석 해제
    // implementation("org.apache.httpcomponents.client5:httpclient5:5.3.1")

    // ==========================================
    // 기타 의존성
    // ==========================================
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-validation")

    implementation("com.fasterxml.jackson.core:jackson-databind")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")

    runtimeOnly("com.h2database:h2")
    implementation("org.springframework.boot:spring-boot-starter-data-mongodb")

    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("io.mockk:mockk:1.13.12")
}

tasks.withType<Test> {
    useJUnitPlatform()
}

kotlin {
    jvmToolchain(21)
    compilerOptions {
        freeCompilerArgs.addAll(listOf("-Xjsr305=strict"))
    }
}

allOpen {
    annotation("jakarta.persistence.Entity")
    annotation("jakarta.persistence.MappedSuperclass")
    annotation("jakarta.persistence.Embeddable")
}
