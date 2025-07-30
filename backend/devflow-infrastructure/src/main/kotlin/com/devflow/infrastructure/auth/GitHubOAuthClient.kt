package com.devflow.infrastructure.auth

import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.stereotype.Component
import org.springframework.web.client.RestTemplate
import org.springframework.http.MediaType
import org.springframework.util.LinkedMultiValueMap
import org.springframework.util.MultiValueMap
import org.springframework.http.ResponseEntity
import org.springframework.web.client.HttpClientErrorException

@Component
class GitHubOAuthClient(
    private val restTemplate: RestTemplate
) {
    
    @Value("\${oauth.github.client-id}")
    private lateinit var clientId: String
    
    @Value("\${oauth.github.client-secret}")
    private lateinit var clientSecret: String
    
    fun getAccessToken(code: String): GitHubAccessTokenResponse {
        val url = "https://github.com/login/oauth/access_token"
        val headers = HttpHeaders().apply {
            setContentType(MediaType.APPLICATION_FORM_URLENCODED)
            set("Accept", "application/json")
        }
        
        val formData: MultiValueMap<String, String> = LinkedMultiValueMap()
        formData.add("client_id", clientId)
        formData.add("client_secret", clientSecret)
        formData.add("code", code)
        
        println("GitHub OAuth Request - URL: $url")
        println("GitHub OAuth Request - Client ID: $clientId")
        println("GitHub OAuth Request - Code: $code")
        println("GitHub OAuth Request - Headers: $headers")
        println("GitHub OAuth Request - Form Data: $formData")
        
        val entity = HttpEntity(formData, headers)
        
        return try {
            val response: ResponseEntity<String> = restTemplate.exchange(
                url,
                HttpMethod.POST,
                entity,
                String::class.java
            )
            
            println("GitHub OAuth Response - Status: ${response.statusCode}")
            println("GitHub OAuth Response - Body: ${response.body}")
            
            // GitHub OAuth API는 성공 시 JSON 또는 form-urlencoded 응답
            val responseBody = response.body ?: throw RuntimeException("Empty response body")
            
            if (responseBody.contains("access_token=")) {
                // 성공 응답 파싱 (form-urlencoded)
                val params = responseBody.split("&").associate { param ->
                    val (key, value) = param.split("=", limit = 2)
                    key to value
                }
                
                GitHubAccessTokenResponse(
                    accessToken = params["access_token"] ?: "",
                    tokenType = params["token_type"] ?: "",
                    scope = params["scope"] ?: ""
                )
            } else if (responseBody.contains("\"access_token\"")) {
                // 성공 응답 파싱 (JSON)
                val jsonResponse = responseBody.trim()
                val accessTokenMatch = Regex("\"access_token\"\\s*:\\s*\"([^\"]+)\"").find(jsonResponse)
                val tokenTypeMatch = Regex("\"token_type\"\\s*:\\s*\"([^\"]+)\"").find(jsonResponse)
                val scopeMatch = Regex("\"scope\"\\s*:\\s*\"([^\"]*)\"").find(jsonResponse)
                
                if (accessTokenMatch != null) {
                    GitHubAccessTokenResponse(
                        accessToken = accessTokenMatch.groupValues[1],
                        tokenType = tokenTypeMatch?.groupValues?.get(1) ?: "bearer",
                        scope = scopeMatch?.groupValues?.get(1) ?: ""
                    )
                } else {
                    throw RuntimeException("GitHub OAuth failed: Invalid JSON response")
                }
            } else {
                // 실패 응답
                throw RuntimeException("GitHub OAuth failed: $responseBody")
            }
        } catch (e: HttpClientErrorException) {
            println("GitHub OAuth HTTP Error: ${e.statusCode} - ${e.responseBodyAsString}")
            throw RuntimeException("GitHub OAuth failed: ${e.responseBodyAsString}")
        } catch (e: Exception) {
            println("GitHub OAuth Error: ${e.message}")
            throw e
        }
    }
    
    fun getUserInfo(accessToken: String): GitHubUserInfo {
        val url = "https://api.github.com/user"
        val headers = HttpHeaders().apply {
            setBearerAuth(accessToken)
            set("Accept", "application/vnd.github.v3+json")
        }
        
        val entity = HttpEntity<Any>(headers)
        
        return restTemplate.exchange(
            url,
            HttpMethod.GET,
            entity,
            GitHubUserInfo::class.java
        ).body ?: throw RuntimeException("Failed to get user info")
    }
}



data class GitHubAccessTokenResponse(
    val accessToken: String,
    val tokenType: String,
    val scope: String
)

data class GitHubUserInfo(
    val id: Long,
    val login: String,
    val email: String?,
    val name: String?,
    val avatarUrl: String?
) 