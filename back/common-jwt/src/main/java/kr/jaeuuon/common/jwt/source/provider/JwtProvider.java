package kr.jaeuuon.common.jwt.source.provider;

import io.jsonwebtoken.*;
import kr.jaeuuon.common.basic.source.exception.CommonException;
import kr.jaeuuon.common.basic.source.logger.CommonLogger;
import kr.jaeuuon.common.basic.source.util.Util;
import kr.jaeuuon.common.jwt.properties.JwtProperties;
import kr.jaeuuon.common.jwt.source.constant.JwtConstant;
import kr.jaeuuon.common.jwt.source.message.enumeration.impl.JwtMessageImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * JWT 생성 및 검증.
 */
@Component
@RequiredArgsConstructor
public class JwtProvider {

    private final JwtProperties jwtProperties;

    /**
     * JWT(Access) 생성 및 리턴.
     */
    public String createAccess(long id, String name, String authorities, String authorityValues) {
        return create(id, name, authorities, authorityValues);
    }

    /**
     * JWT(Refresh) 생성 및 리턴.
     */
    public String createRefresh() {
        return create(null, null, null, null);
    }

    /**
     * JWT(Access/Refresh) 생성 및 리턴.
     */
    private String create(Long id, String name, String authorities, String authorityValues) {
        JwtBuilder jwt = Jwts.builder();

        if (authorities != null) {
            jwt.claim(JwtConstant.ID_KEY, id).claim(JwtConstant.NAME_KEY, name).claim(JwtConstant.AUTHORITIES_KEY, authorities).claim(JwtConstant.AUTHORITY_VALUES_KEY, authorityValues).setExpiration(new Date(System.currentTimeMillis() + (jwtProperties.getAccessExpirationMinutes() * 60 * 1000)));
        } else {
            jwt.setExpiration(new Date(System.currentTimeMillis() + (jwtProperties.getRefreshExpirationMinutes() * 60 * 1000)));
        }

        return jwt.signWith(jwtProperties.getKey(), SignatureAlgorithm.HS256).compact();
    }

    /**
     * 서명키로 JWT를 파싱하여 Claims 리턴.
     */
    public Claims getClaims(String requestIp, String requestId, String jwt) throws CommonException {
        try {
            return Jwts.parserBuilder().setSigningKey(jwtProperties.getKey()).build().parseClaimsJws(jwt).getBody();
        } catch (Exception e) {
            if (e instanceof ExpiredJwtException) {
                throw new CommonException(HttpStatus.UNAUTHORIZED, JwtMessageImpl.ERROR_JWT_EXPIRED);
            } else {
                CommonLogger.error(requestIp, requestId, Util.getCallerClassAndMethodName(), e.getClass().getSimpleName(), e.getMessage());

                throw new CommonException(HttpStatus.UNAUTHORIZED);
            }
        }
    }
}
