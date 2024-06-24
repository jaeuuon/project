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

    public void add(String refresh, long userId) throws JsonProcessingException {
        redisService.add(PREFIX, refresh, new Jwt(userId), jwtProperties.getExpirationMinutes());
    }

    public Optional<Jwt> get(String refresh) throws JsonProcessingException {
        return redisService.get(PREFIX, refresh, Jwt.class);
    }

    public boolean remove(String refresh) {
        return redisService.remove(PREFIX, refresh);
    }

}
