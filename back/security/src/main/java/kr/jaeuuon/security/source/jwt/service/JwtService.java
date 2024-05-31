package kr.jaeuuon.security.source.jwt.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import kr.jaeuuon.common.jwt.properties.JwtProperties;
import kr.jaeuuon.common.redis.source.service.RedisService;
import kr.jaeuuon.security.source.jwt.entity.Jwt;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class JwtService {

    private static final String PREFIX = "project" + RedisService.SEPARATOR + "jwt";

    private final RedisService<Jwt> redisService;

    private final JwtProperties jwtProperties;

    public void add(long userId, String refresh) throws JsonProcessingException {
        Jwt jwt = new Jwt(refresh);

        redisService.add(PREFIX, String.valueOf(userId), jwt, jwtProperties.getExpirationMinutes());
    }

    public Optional<Jwt> get(long userId) throws JsonProcessingException {
        return redisService.get(PREFIX, String.valueOf(userId), Jwt.class);
    }

    public boolean remove(long userId) {
        return redisService.remove(PREFIX, String.valueOf(userId));
    }

}
