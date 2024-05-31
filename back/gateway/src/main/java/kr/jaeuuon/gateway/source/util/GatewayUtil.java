package kr.jaeuuon.gateway.source.util;

import kr.jaeuuon.common.basic.source.constant.CommonConstant;
import org.springframework.cloud.gateway.support.ipresolver.XForwardedRemoteAddressResolver;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.server.ServerWebExchange;

import java.net.InetSocketAddress;

/**
 * 프로젝트 유틸.
 */
public class GatewayUtil {

    /**
     * 요청 IP 리턴.
     */
    public static String getRequestIp(ServerWebExchange exchange) {
        XForwardedRemoteAddressResolver resolver = XForwardedRemoteAddressResolver.maxTrustedIndex(1);
        InetSocketAddress inetSocketAddress = resolver.resolve(exchange);

        return inetSocketAddress.getAddress().getHostAddress();
    }

    /**
     * 헤더의 사용자 아이디 리턴(User-Id).
     */
    public static String getUserId(ServerHttpRequest request) {
        return request.getHeaders().getFirst(CommonConstant.HEADER_USER_ID);
    }

}
