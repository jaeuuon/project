package kr.jaeuuon.common.redis.properties;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "spring.cache.redis")
@Setter
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RedisProperties {

    private String host;
    private int port;

    private String username;
    private String password;

    private long expirationMinutes;

}
