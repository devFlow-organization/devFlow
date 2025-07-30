package com.devflow.interfaces.auth

import com.devflow.application.auth.AuthService
import com.devflow.application.auth.AuthResult
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.net.URLEncoder
import java.nio.charset.StandardCharsets
import java.util.*
import javax.crypto.Mac
import javax.crypto.spec.SecretKeySpec
import java.security.MessageDigest

@RestController
@RequestMapping("/api/auth")
class AuthController(
    private val authService: AuthService
) {
    
    @Value("\${oauth.github.client-id}")
    private lateinit var clientId: String
    
    @Value("\${oauth.github.redirect-uri:http://localhost:3000/auth/github/callback}")
    private lateinit var redirectUri: String
    
    @PostMapping("/github/authenticate")
    fun authenticateWithGitHub(@RequestBody request: GitHubAuthRequest): ResponseEntity<AuthResponse> {
        return when (val result = authService.authenticateWithGitHub(request.code)) {
            is AuthResult.Success -> {
                ResponseEntity.ok(AuthResponse.success(result.user))
            }
            is AuthResult.Failure -> {
                ResponseEntity.badRequest().body(AuthResponse.failure(result.message))
            }
        }
    }
    
                    @GetMapping("/github/callback")
                fun githubCallback(@RequestParam("code") code: String): ResponseEntity<Void> {
                    return when (val result = authService.authenticateWithGitHub(code)) {
                        is AuthResult.Success -> {
                            // JWT 토큰 생성
                            val token = generateJwtToken(result.user)
                            
                            // 프론트엔드 메인 페이지로 리다이렉트 (성공 시)
                            val redirectUrl = "http://localhost:3000?login=success&token=$token"
                            ResponseEntity.status(302)
                                .header("Location", redirectUrl)
                                .build()
                        }
                        is AuthResult.Failure -> {
                            // 프론트엔드 메인 페이지로 리다이렉트 (실패 시)
                            val encodedMessage = URLEncoder.encode(result.message, StandardCharsets.UTF_8.toString())
                            val redirectUrl = "http://localhost:3000?error=$encodedMessage"
                            ResponseEntity.status(302)
                                .header("Location", redirectUrl)
                                .build()
                        }
                    }
                }
    
    @GetMapping("/github/login")
    fun getGitHubLoginUrl(): ResponseEntity<GitHubLoginUrlResponse> {
        val url = "https://github.com/login/oauth/authorize?client_id=$clientId&redirect_uri=$redirectUri&scope=user:email"
        
        println("Generated GitHub Login URL: $url")
        return ResponseEntity.ok(GitHubLoginUrlResponse(url))
    }
    
    @GetMapping("/me")
    fun getCurrentUser(@RequestHeader("Authorization") authHeader: String?): ResponseEntity<*> {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body(mapOf(
                "success" to false,
                "message" to "No valid token provided"
            ))
        }
        
        val token = authHeader.substring(7)
        return try {
            val userInfo = validateJwtToken(token)
            ResponseEntity.ok(mapOf(
                "success" to true,
                "user" to userInfo
            ))
        } catch (e: Exception) {
            ResponseEntity.status(401).body(mapOf(
                "success" to false,
                "message" to "Invalid token"
            ))
        }
    }
    
    @PostMapping("/logout")
    fun logout(): ResponseEntity<Map<String, String>> {
        return ResponseEntity.ok(mapOf("message" to "Logged out successfully"))
    }
    
    @GetMapping("/test")
    fun test(): ResponseEntity<Map<String, String>> {
        return ResponseEntity.ok(mapOf(
            "message" to "Server is running",
            "clientId" to clientId,
            "redirectUri" to redirectUri
        ))
    }
    
    private fun generateJwtToken(user: com.devflow.application.auth.UserDto): String {
        val header = Base64.getUrlEncoder().withoutPadding().encodeToString(
            """{"alg":"HS256","typ":"JWT"}""".toByteArray()
        )
        
        val payload = Base64.getUrlEncoder().withoutPadding().encodeToString(
            """{"userId":"${user.id}","email":"${user.email}","name":"${user.name}","exp":${System.currentTimeMillis() + 86400000}}""".toByteArray()
        )
        
        val secret = "your-secret-key-here"
        val signature = Base64.getUrlEncoder().withoutPadding().encodeToString(
            generateHmacSha256("$header.$payload", secret)
        )
        
        return "$header.$payload.$signature"
    }
    
    private fun validateJwtToken(token: String): Map<String, Any> {
        val parts = token.split(".")
        if (parts.size != 3) {
            throw RuntimeException("Invalid token format")
        }
        
        val payload = String(Base64.getUrlDecoder().decode(parts[1]))
        val payloadMap = payload.removeSurrounding("{", "}")
            .split(",")
            .associate { pair ->
                val (key, value) = pair.split(":", limit = 2)
                key.trim().removeSurrounding("\"") to value.trim().removeSurrounding("\"")
            }
        
        // 간단한 검증 (실제로는 서명 검증도 필요)
        val exp = payloadMap["exp"]?.toLongOrNull() ?: 0L
        if (System.currentTimeMillis() > exp) {
            throw RuntimeException("Token expired")
        }
        
        return mapOf(
            "id" to (payloadMap["userId"] ?: ""),
            "email" to (payloadMap["email"] ?: ""),
            "name" to (payloadMap["name"] ?: "")
        )
    }
    
    private fun generateHmacSha256(data: String, secret: String): ByteArray {
        val mac = Mac.getInstance("HmacSHA256")
        val secretKeySpec = SecretKeySpec(secret.toByteArray(), "HmacSHA256")
        mac.init(secretKeySpec)
        return mac.doFinal(data.toByteArray())
    }
}

data class AuthResponse(
    val success: Boolean,
    val message: String? = null,
    val user: UserDto? = null
) {
    companion object {
        fun success(user: com.devflow.application.auth.UserDto): AuthResponse {
            return AuthResponse(
                success = true,
                user = UserDto(
                    id = user.id,
                    email = user.email,
                    name = user.name,
                    provider = user.provider,
                    lastLoginAt = user.lastLoginAt
                )
            )
        }
        
        fun failure(message: String): AuthResponse {
            return AuthResponse(
                success = false,
                message = message
            )
        }
    }
}

data class UserDto(
    val id: String?,
    val email: String,
    val name: String?,
    val provider: String,
    val lastLoginAt: java.time.LocalDateTime?
)

data class GitHubLoginUrlResponse(
    val loginUrl: String
)

data class GitHubAuthRequest(
    val code: String
) 