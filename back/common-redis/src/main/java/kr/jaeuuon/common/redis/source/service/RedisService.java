package kr.jaeuuon.common.redis.source.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
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
    public void add(String prefix, String key, Object value, long expirationMinutes) throws JsonProcessingException {
        String prefixKey = getPrefixKey(prefix, key);

        redisTemplate.opsForValue().set(prefixKey, objectMapper.writeValueAsString(value));
        redisTemplate.expire(prefixKey, expirationMinutes, TimeUnit.MINUTES);
    }

    /**
     * 데이터 조회.
     */
    public Optional<T> get(String prefix, String key, Class<T> type) throws JsonProcessingException {
        String value = redisTemplate.opsForValue().get(getPrefixKey(prefix, key));

        if (value != null) {
            return Optional.ofNullable(objectMapper.readValue(value, type));
        } else {
            return Optional.empty();
        }
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

}
