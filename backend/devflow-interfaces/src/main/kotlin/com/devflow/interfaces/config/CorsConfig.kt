package com.devflow.interfaces.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class CorsConfig : WebMvcConfigurer {

                    override fun addCorsMappings(registry: CorsRegistry) {
                    registry.addMapping("/**")
                        .allowedOrigins(
                            "http://localhost:3000", 
                            "http://127.0.0.1:3000"
                        )
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                        .allowedHeaders("*")
                        .allowCredentials(true)
                        .maxAge(3600)
                }

                    @Bean
                fun corsConfigurationSource(): CorsConfigurationSource {
                    val configuration = CorsConfiguration()
                    configuration.allowedOrigins = listOf(
                        "http://localhost:3000", 
                        "http://127.0.0.1:3000"
                    )
                    configuration.allowedMethods = listOf("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                    configuration.allowedHeaders = listOf("*")
                    configuration.allowCredentials = true
                    configuration.maxAge = 3600L

                    val source = UrlBasedCorsConfigurationSource()
                    source.registerCorsConfiguration("/**", configuration)
                    return source
                }
} 