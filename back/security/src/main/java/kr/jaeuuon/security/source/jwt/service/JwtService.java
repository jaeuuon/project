package kr.jaeuuon.security.source.jwt.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import kr.jaeuuon.common.jwt.properties.JwtProperties;
import kr.jaeuuon.common.redis.source.service.RedisService;
import kr.jaeuuon.security.source.jwt.entity.Jwt;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * JWT 저장/조회/삭제 서비스.
 */
@Service
@RequiredArgsConstructor
public class JwtService {

    private static final String PREFIX = "project::jwt";

    private final RedisService<Jwt> redisService;

    private final JwtProperties jwtProperties;

    /**
     * 사용자 아이디를 키로하여 JWT(Refresh) 저장.
     */
    public void add(long userId, String refresh) throws JsonProcessingException {
        redisService.add(PREFIX, String.valueOf(userId), new Jwt(refresh), jwtProperties.getRefreshExpirationMinutes());
    }

    /**
     * 사용자 아이디를 키로하여 JWT(Refresh) 조회.
     */
    public Optional<Jwt> get(long userId) throws JsonProcessingException {
        return redisService.get(PREFIX, String.valueOf(userId), Jwt.class);
    }

    /**
     * 사용자 아이디를 키로하여 JWT(Refresh) 삭제.
     */
    public boolean remove(long userId) {
        return redisService.remove(PREFIX, String.valueOf(userId));
    }

}
