package kr.jaeuuon.common.redis.source.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class RedisService<T> {

    private final RedisTemplate<String, String> redisTemplate;

    private final ObjectMapper objectMapper;

    public void add(String prefix, String key, Object value, long expirationMinutes) throws JsonProcessingException {
        String prefixKey = getPrefixKey(prefix, key);

        redisTemplate.opsForValue().set(prefixKey, objectMapper.writeValueAsString(value));
        redisTemplate.expire(prefixKey, expirationMinutes, TimeUnit.MINUTES);
    }

    public Optional<T> get(String prefix, String key, Class<T> type) throws JsonProcessingException {
        String value = redisTemplate.opsForValue().get(getPrefixKey(prefix, key));

        if (value != null) {
            return Optional.ofNullable(objectMapper.readValue(value, type));
        } else {
            return Optional.empty();
        }
    }

    public boolean remove(String prefix, String key) {
        Boolean result = redisTemplate.delete(getPrefixKey(prefix, key));

        return Boolean.TRUE.equals(result);
    }

    private String getPrefixKey(String prefix, String key) {
        return prefix + "::" + key;
    }

}
