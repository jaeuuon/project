package kr.jaeuuon.common.redis.source.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import kr.jaeuuon.common.basic.source.logger.CommonLogger;
import kr.jaeuuon.common.basic.source.util.Util;
import kr.jaeuuon.common.redis.source.exception.RedisException;
import kr.jaeuuon.common.redis.source.message.enumeration.impl.RedisMessageImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.concurrent.TimeUnit;

/**
 * Redis 데이터 조회/등록/삭제 서비스.
 */
@Service
@RequiredArgsConstructor
public class RedisService<T> {

    private final RedisTemplate<String, String> redisTemplate;

    private final ObjectMapper objectMapper;

    /**
     * 데이터 저장.
     */
    public void add(String prefix, long key, Object value, long expirationMinutes) {
        add(prefix, String.valueOf(key), value, expirationMinutes);
    }

    /**
     * 데이터 저장.
     */
    public void add(String prefix, String key, Object value, long expirationMinutes) {
        String prefixKey = getPrefixKey(prefix, key);

        redisTemplate.opsForValue().set(prefixKey, objectToString(value));
        redisTemplate.expire(prefixKey, expirationMinutes, TimeUnit.MINUTES);
    }

    /**
     * 데이터 조회.
     */
    public Optional<T> get(String prefix, long key, Class<T> type) {
        return get(prefix, String.valueOf(key), type);
    }

    /**
     * 데이터 조회.
     */
    public Optional<T> get(String prefix, String key, Class<T> type) {
        String value = redisTemplate.opsForValue().get(getPrefixKey(prefix, key));

        return stringToObject(value, type);
    }

    /**
     * 데이터 삭제.
     */
    public boolean remove(String prefix, long key) {
        return remove(prefix, String.valueOf(key));
    }

    /**
     * 데이터 삭제.
     */
    public boolean remove(String prefix, String key) {
        Boolean result = redisTemplate.delete(getPrefixKey(prefix, key));

        return Boolean.TRUE.equals(result);
    }

    /**
     * 접두사 + 키 리턴.
     */
    private String getPrefixKey(String prefix, String key) {
        return prefix + "::" + key;
    }

    /**
     * 데이터 저장 함수(Object → String).
     */
    private String objectToString(Object object) throws RedisException {
        try {
            return objectMapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            error(Util.getCallerClassAndMethodName(), e);

            throw new RedisException(HttpStatus.INTERNAL_SERVER_ERROR, RedisMessageImpl.ERROR_REDIS_001);
        }
    }

    /**
     * 데이터 조회 함수(String → Object).
     */
    private Optional<T> stringToObject(String value, Class<T> type) throws RedisException {
        if (value != null) {
            try {
                return Optional.ofNullable(objectMapper.readValue(value, type));
            } catch (JsonProcessingException e) {
                error(Util.getCallerClassAndMethodName(), e);

                throw new RedisException(HttpStatus.INTERNAL_SERVER_ERROR, RedisMessageImpl.ERROR_REDIS_002);
            }
        } else {
            return Optional.empty();
        }
    }

    private void error(String callerClassAndMethodName, JsonProcessingException e) {
        HttpServletRequest request = Util.getRequest();

        if (request != null) {
            CommonLogger.error(request.getRemoteAddr(), Util.getRequestId(request), callerClassAndMethodName, e.getClass().getSimpleName(), e);
        } else {
            CommonLogger.error(null, null, callerClassAndMethodName, e.getClass().getSimpleName(), e);
        }
    }

}
