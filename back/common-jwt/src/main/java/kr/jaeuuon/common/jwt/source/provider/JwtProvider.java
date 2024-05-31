package kr.jaeuuon.common.jwt.source.provider;

import io.jsonwebtoken.*;
import kr.jaeuuon.common.basic.source.exception.CommonException;
import kr.jaeuuon.common.jwt.properties.JwtProperties;
import kr.jaeuuon.common.jwt.source.constant.JwtConstant;
import kr.jaeuuon.common.jwt.source.message.enumeration.impl.JwtMessageImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtProvider {

    private final JwtProperties jwtProperties;

    public String createAccess(long id, String name, String authorities, String authorityValues) {
        return create(id, name, authorities, authorityValues);
    }

    public String createRefresh() {
        return create(null, null, null, null);
    }

    private String create(Long id, String name, String authorities, String authorityValues) {
        JwtBuilder jwt = Jwts.builder();

        if (authorities != null) {
            jwt.claim(JwtConstant.ID_KEY, id).claim(JwtConstant.NAME_KEY, name).claim(JwtConstant.AUTHORITIES_KEY, authorities).claim(JwtConstant.AUTHORITY_VALUES_KEY, authorityValues).setExpiration(new Date(System.currentTimeMillis() + (jwtProperties.getAccessExpirationMinutes() * 60 * 1000)));
        } else {
            jwt.setExpiration(new Date(System.currentTimeMillis() + (jwtProperties.getRefreshExpirationMinutes() * 60 * 1000)));
        }

        return jwt.signWith(jwtProperties.getKey(), SignatureAlgorithm.HS256).compact();
    }

    public Claims getClaims(String jwt) {
        try {
            return Jwts.parserBuilder().setSigningKey(jwtProperties.getKey()).build().parseClaimsJws(jwt).getBody();
        } catch (Exception e) {
            if (e instanceof ExpiredJwtException) {
                throw new CommonException(HttpStatus.UNAUTHORIZED, JwtMessageImpl.ERROR_JWT_EXPIRED);
            } else {
                throw e;
            }
        }
    }
}
