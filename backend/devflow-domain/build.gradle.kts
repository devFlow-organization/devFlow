plugins {
    kotlin("plugin.jpa")
    kotlin("plugin.spring")
}

dependencies {
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    implementation(project(":devflow-common"))

    // Spring 어노테이션을 사용하기 위한 Spring Context 의존성
    implementation("org.springframework:spring-context:6.2.9")
} 