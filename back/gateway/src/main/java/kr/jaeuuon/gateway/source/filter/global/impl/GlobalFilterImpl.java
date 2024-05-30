package kr.jaeuuon.gateway.source.filter.global.impl;

import io.jsonwebtoken.Claims;
import kr.jaeuuon.common.basic.source.constant.CommonConstant;
import kr.jaeuuon.common.jwt.source.constant.JwtConstant;
import kr.jaeuuon.common.jwt.source.exception.JwtException;
import kr.jaeuuon.common.jwt.source.provider.JwtProvider;
import kr.jaeuuon.gateway.source.logger.GatewayLogger;
import kr.jaeuuon.gateway.source.util.GatewayUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

/**
 * 글로벌 필터.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class GlobalFilterImpl implements GlobalFilter, Ordered {

    private final JwtProvider jwtProvider;

    /**
     * 요청 ID 및 JWT를 파싱하여 헤더에 추가(Request-Id, User-Id/Authorities).
     */
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();

        String requestIp = GatewayUtil.getRequestIp(exchange);
        String requestId = request.getId();
        String jwt = getJwt(request);

        if (StringUtils.hasText(jwt)) {
            request = setUserHeaders(request, requestIp, requestId, jwt);
        } else {
            request = removeUserHeaders(request, requestId);
        }

        return chain.filter(exchange.mutate().request(request).build()).then(Mono.fromRunnable(() -> {
            HttpStatus httpStatus = (HttpStatus) exchange.getResponse().getStatusCode();

            if (httpStatus != null && !httpStatus.isError()) {
                GatewayLogger.info(requestIp, requestId, exchange.getRequest(), httpStatus);
            } else {
                GatewayLogger.error(requestIp, requestId, exchange.getRequest(), httpStatus);
            }
        }));
    }

    /**
     * 헤더의 시작이 Bearer일 경우 토큰 리턴(Authorization).
     */
    private String getJwt(ServerHttpRequest request) {
        String authorizationHeader = request.getHeaders().getFirst(JwtConstant.HEADER_AUTHORIZATION);

        return StringUtils.hasText(authorizationHeader) && authorizationHeader.startsWith(JwtConstant.HEADER_AUTHORIZATION_GRANT_TYPE) ? authorizationHeader.substring(JwtConstant.HEADER_AUTHORIZATION_GRANT_TYPE.length()) : null;
    }

    /**
     * 헤더 추가(Request-Id, User-Id/Authorities).
     */
    private ServerHttpRequest setUserHeaders(ServerHttpRequest request, String requestIp, String requestId, String jwt) throws JwtException {
        Claims claims = jwtProvider.getClaims(requestIp, requestId, jwt, false);
        String authorities = claims.get(JwtConstant.AUTHORITIES_KEY).toString();

        return request.mutate().headers(headers -> {
            headers.set(CommonConstant.HEADER_REQUEST_ID, requestId);

            headers.set(CommonConstant.HEADER_USER_ID, claims.get(JwtConstant.ID_KEY).toString());
            headers.set(CommonConstant.HEADER_USER_AUTHORITIES, authorities);
        }).build();
    }

    /**
     * 헤더 추가(Request-Id) 및 헤더(User-Id/Authorities) 제거.
     */
    private ServerHttpRequest removeUserHeaders(ServerHttpRequest request, String requestId) {
        return request.mutate().headers(headers -> {
            headers.set(CommonConstant.HEADER_REQUEST_ID, requestId);

            headers.remove(CommonConstant.HEADER_USER_ID);
            headers.remove(CommonConstant.HEADER_USER_AUTHORITIES);
        }).build();
    }

    /**
     * 필터 순서 설정.
     */
    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE;
    }

}
