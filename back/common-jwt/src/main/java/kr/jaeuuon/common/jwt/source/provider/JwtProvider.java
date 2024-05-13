package kr.jaeuuon.common.jwt.source.provider;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.DecodingException;
import io.jsonwebtoken.security.SecurityException;
import kr.jaeuuon.common.basic.source.logger.CommonLogger;
import kr.jaeuuon.common.basic.source.message.enumeration.Message;
import kr.jaeuuon.common.basic.source.util.Util;
import kr.jaeuuon.common.jwt.properties.JwtProperties;
import kr.jaeuuon.common.jwt.source.constant.JwtConstant;
import kr.jaeuuon.common.jwt.source.exception.JwtException;
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
    public Claims getClaims(String requestIp, String requestId, String jwt, boolean ignoreExpired) throws JwtException {
        try {
            return Jwts.parserBuilder().setSigningKey(jwtProperties.getKey()).build().parseClaimsJws(jwt).getBody();
        } catch (Exception e) {
            Message message;

            if (e instanceof DecodingException) {
                message = JwtMessageImpl.ERROR_JWT_002;
            } else if (e instanceof ExpiredJwtException eje) {
                if (ignoreExpired) {
                    return eje.getClaims();
                } else {
                    message = JwtMessageImpl.ERROR_JWT_003;
                }
            } else if (e instanceof UnsupportedJwtException) {
                message = JwtMessageImpl.ERROR_JWT_004;
            } else if (e instanceof MalformedJwtException) {
                message = JwtMessageImpl.ERROR_JWT_005;
            } else if (e instanceof SecurityException) {
                message = JwtMessageImpl.ERROR_JWT_006;
            } else if (e instanceof IllegalArgumentException) {
                message = JwtMessageImpl.ERROR_JWT_007;
            } else {
                message = JwtMessageImpl.ERROR_JWT_001;
            }

            CommonLogger.error(requestIp, requestId, Util.getCallerClassAndMethodName(), e.getClass().getSimpleName(), e.getMessage());

            throw new JwtException(HttpStatus.UNAUTHORIZED, message);
        }
    }
}
