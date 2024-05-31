package kr.jaeuuon.gateway.source.util;

import kr.jaeuuon.common.basic.source.constant.CommonConstant;
import org.springframework.cloud.gateway.support.ipresolver.XForwardedRemoteAddressResolver;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.server.ServerWebExchange;

import java.net.InetSocketAddress;

public class GatewayUtil {

    public static String getRequestIp(ServerWebExchange exchange) {
        XForwardedRemoteAddressResolver resolver = XForwardedRemoteAddressResolver.maxTrustedIndex(1);
        InetSocketAddress inetSocketAddress = resolver.resolve(exchange);

        return inetSocketAddress.getAddress().getHostAddress();
    }

    public static String getUserId(ServerHttpRequest request) {
        return request.getHeaders().getFirst(CommonConstant.HEADER_USER_ID);
    }

}
