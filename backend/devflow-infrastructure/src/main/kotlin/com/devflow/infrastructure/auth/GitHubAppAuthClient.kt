package com.devflow.infrastructure.auth

import io.jsonwebtoken.Jwts
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders as SpringHttpHeaders
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate
import java.security.KeyFactory
import java.security.PrivateKey
import java.security.spec.PKCS8EncodedKeySpec
import java.time.Instant
import java.time.temporal.ChronoUnit
import java.util.*

@Service
class GitHubAppAuthClient(
    private val restTemplate: RestTemplate
) {
    @Value("\${github.app.id}")
    private lateinit var appId: String

    @Value("\${github.app.private-key}")
    private lateinit var privateKeyString: String

    private fun createJwt(): String {
        val now = Instant.now()
        val expiration = now.plus(9, ChronoUnit.MINUTES) // 만료 시간은 10분 미만이어야 함

        return Jwts.builder()
            .issuer(appId)
            .issuedAt(Date.from(now))
            .expiration(Date.from(expiration))
            .signWith(getPrivateKey())
            .compact()
    }

    fun getInstallationAccessToken(installationId: Long): String {
        val jwt = createJwt()
        val url = "https://api.github.com/app/installations/$installationId/access_tokens"

        val headers = SpringHttpHeaders().apply {
            setBearerAuth(jwt)
            set("Accept", "application/vnd.github.v3+json")
            set("User-Agent", "DevFlow-GitHub-App")
        }

        val entity = HttpEntity<Void>(headers)

        val response = restTemplate.postForEntity(url, entity, InstallationTokenResponse::class.java)

        return response.body?.token ?: throw RuntimeException("Failed to get installation access token")
    }

    private fun getPrivateKey(): PrivateKey {
        val cleanedKey = privateKeyString
            .replace("-----BEGIN PRIVATE KEY-----", "")
            .replace("-----END PRIVATE KEY-----", "")
            .replace("\\s".toRegex(), "") // 모든 공백 및 개행 문자 제거

        val keyBytes = Base64.getDecoder().decode(cleanedKey)
        val keySpec = PKCS8EncodedKeySpec(keyBytes)
        return KeyFactory.getInstance("RSA").generatePrivate(keySpec)
    }

    private data class InstallationTokenResponse(
        val token: String,
        val expires_at: String? = null,
        val permissions: Map<String, String>? = null
    )
}