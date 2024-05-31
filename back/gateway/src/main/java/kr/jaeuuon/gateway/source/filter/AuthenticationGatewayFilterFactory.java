package kr.jaeuuon.gateway.source.filter;

import kr.jaeuuon.common.basic.source.constant.CommonConstant;
import kr.jaeuuon.common.basic.source.exception.CommonException;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationGatewayFilterFactory extends AbstractGatewayFilterFactory<AuthenticationGatewayFilterFactory.Config> {

    public AuthenticationGatewayFilterFactory() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            if (exchange.getRequest().getHeaders().getFirst(CommonConstant.HEADER_USER_ID) == null) {
                throw new CommonException(HttpStatus.UNAUTHORIZED);
            }

            return chain.filter(exchange);
        };
    }

    public static class Config {
    }

}
