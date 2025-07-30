package com.devflow.infrastructure.auth

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpHeaders
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
        return Jwts.builder()
            .setIssuer(appId)
            .setIssuedAt(Date.from(now))
            .setExpiration(Date.from(now.plus(9, ChronoUnit.MINUTES))) // 만료 시간은 10분 미만이어야 함
            .signWith(getPrivateKey(), SignatureAlgorithm.RS256)
            .compact()
    }

    fun getInstallationAccessToken(installationId: Long): String {
        val jwt = createJwt()
        val url = "https://api.github.com/app/installations/$installationId/access_tokens"

        val headers = HttpHeaders().apply {
            setBearerAuth(jwt)
            set("Accept", "application/vnd.github.v3+json")
        }

        val entity = org.springframework.http.HttpEntity<Void>(headers)

        val response = restTemplate.postForEntity(url, entity, InstallationTokenResponse::class.java)

        return response.body?.token ?: throw RuntimeException("Failed to get installation access token")
    }

    private fun getPrivateKey(): PrivateKey {
        val keyBytes = Base64.getDecoder().decode(
            privateKeyString
                .replace("-----BEGIN PRIVATE KEY-----", "")
                .replace("-----END PRIVATE KEY-----", "")
                .replace("\\s".toRegex(), "") // 모든 공백 및 개행 문자 제거
        )
        val keySpec = PKCS8EncodedKeySpec(keyBytes)
        return KeyFactory.getInstance("RSA").generatePrivate(keySpec)
    }

    private data class InstallationTokenResponse(val token: String)
}