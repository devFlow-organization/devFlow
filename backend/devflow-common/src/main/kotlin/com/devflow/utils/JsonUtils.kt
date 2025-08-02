package com.devflow.utils

import com.fasterxml.jackson.databind.ObjectMapper
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component

@Component
class JsonUtils(
    val objectMapper: ObjectMapper
) {
    val logger = LoggerFactory.getLogger(javaClass)

    /**
     * 객체를 JSON 문자열로 변환합니다.
     * @param data 변환할 객체
     * @return JSON 문자열. 변환 실패 시 null을 반환합니다.
     */
    fun toJson(data: Any): String? {
        return try {
            objectMapper.writeValueAsString(data)
        } catch (e: Exception) {
            logger.error("Failed to serialize object to JSON string. data=$data", e)
            null
        }
    }

    /**
     * JSON 문자열을 지정된 타입의 객체로 변환합니다.
     * reified 제네릭을 사용하여 .class.java 없이 깔끔한 호출이 가능합니다.
     *
     * 사용 예: val event = jsonUtils.toObject<InstallationEventPayload>(payload)
     *
     * @param json 변환할 JSON 문자열
     * @return 변환된 객체. 변환 실패 시 null을 반환합니다.
     */
    inline fun <reified T> toObject(json: String): T? {
        return try {
            objectMapper.readValue(json, T::class.java)
        } catch (e: Exception) {
            logger.error("Failed to deserialize JSON string to object. type=${T::class.java.simpleName}, json=$json", e)
            null
        }
    }
}