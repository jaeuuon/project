package kr.jaeuuon.common.redis.config;

import kr.jaeuuon.common.redis.properties.RedisProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;

/**
 * 프로젝트 설정.
 */
@Configuration
@ConfigurationPropertiesScan(basePackages = "it.jaeuuon.common.redis")
@RequiredArgsConstructor
public class RedisConfig {

    private final RedisProperties redisProperties;

    /**
     * Redis Client 설정.
     */
    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        RedisStandaloneConfiguration redisStandaloneConfiguration = new RedisStandaloneConfiguration();

        redisStandaloneConfiguration.setHostName(redisProperties.getHost());
        redisStandaloneConfiguration.setPort(redisProperties.getPort());
        redisStandaloneConfiguration.setUsername(redisProperties.getUsername());
        redisStandaloneConfiguration.setPassword(redisProperties.getPassword());

        return new LettuceConnectionFactory(redisStandaloneConfiguration);
    }

    /**
     * RedisTemplate 설정.
     */
    @Bean
    public RedisTemplate<String, String> redisTemplate() {
        RedisTemplate<String, String> redisTemplate = new RedisTemplate<>();

        redisTemplate.setConnectionFactory(redisConnectionFactory());
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new StringRedisSerializer());

        return redisTemplate;
    }

}
