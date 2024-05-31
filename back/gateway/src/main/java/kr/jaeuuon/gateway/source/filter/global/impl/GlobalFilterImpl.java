package kr.jaeuuon.gateway.source.filter.global.impl;

import io.jsonwebtoken.Claims;
import kr.jaeuuon.common.basic.source.constant.CommonConstant;
import kr.jaeuuon.common.jwt.source.constant.JwtConstant;
import kr.jaeuuon.common.jwt.source.provider.JwtProvider;
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
        ServerHttpRequest request = setUserHeaders(exchange.getRequest(), getJwt(exchange.getRequest()));

        return chain.filter(exchange.mutate().request(request).build()).then(Mono.fromRunnable(() -> {
            HttpStatus httpStatus = (HttpStatus) exchange.getResponse().getStatusCode();

            String requestIp = GatewayUtil.getRequestIp(exchange);
            String requestId = request.getId();
            String userId = GatewayUtil.getUserId(request);
            String methodName = request.getMethod().name();
            String path = request.getPath().value();

            if (httpStatus != null && !httpStatus.isError()) {
                log.info("[{}][{}][uid: {}][{} {}][status: {}]", requestIp, requestId, userId, methodName, path, httpStatus);
            } else {
                log.error("[{}][{}][uid: {}][{} {}][status: {}]", requestIp, requestId, userId, methodName, path, httpStatus);
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
     * 헤더 추가(Request-Id) 및 헤더(User-Id/Authorities) 추가 또는 제거.
     */
    private ServerHttpRequest setUserHeaders(ServerHttpRequest request, String jwt) {
        return request.mutate().headers(headers -> {
            headers.set(CommonConstant.HEADER_REQUEST_ID, request.getId());

            if (StringUtils.hasText(jwt)) {
                Claims claims = jwtProvider.getClaims(jwt);

                headers.set(CommonConstant.HEADER_USER_ID, claims.get(JwtConstant.ID_KEY).toString());
                headers.set(CommonConstant.HEADER_USER_AUTHORITIES, claims.get(JwtConstant.AUTHORITIES_KEY).toString());
            } else {
                headers.remove(CommonConstant.HEADER_USER_ID);
                headers.remove(CommonConstant.HEADER_USER_AUTHORITIES);
            }
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
