package kr.jaeuuon.gateway.source.filter;

import kr.jaeuuon.common.basic.source.constant.CommonConstant;
import kr.jaeuuon.common.jwt.source.exception.JwtException;
import kr.jaeuuon.gateway.source.message.enumeration.impl.GatewayMessageImpl;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

/**
 * 인증 필터.
 */
@Component
public class AuthenticationGatewayFilterFactory extends AbstractGatewayFilterFactory<AuthenticationGatewayFilterFactory.Config> {

    public AuthenticationGatewayFilterFactory() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            validation(exchange.getRequest());

            return chain.filter(exchange);
        };
    }

    /**
     * 헤더가 있는지 체크(User-Id).
     */
    private void validation(ServerHttpRequest request) throws JwtException {
        if (request.getHeaders().getFirst(CommonConstant.HEADER_USER_ID) == null) {
            throw new JwtException(HttpStatus.UNAUTHORIZED, GatewayMessageImpl.ERROR_GATE_AUTH_001);
        }
    }

    public static class Config {
    }

}