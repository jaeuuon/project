package kr.jaeuuon.gateway.source.logger;

import kr.jaeuuon.common.basic.source.constant.CommonConstant;
import kr.jaeuuon.common.basic.source.message.enumeration.Message;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;

/**
 * 프로젝트 로깅.
 */
@Slf4j
public class GatewayLogger {

    /**
     * 요청 및 응답 로깅(정상).
     */
    public static void info(String requestIp, String requestId, ServerHttpRequest request, HttpStatus httpStatus) {
        log.info("[{}][{}][uid: {}][{} {}][status: {}]", requestIp, requestId, getUserId(request), request.getMethod().name(), request.getPath().value(), httpStatus);
    }

    /**
     * 요청 및 응답 로깅(오류).
     */
    public static void error(String requestIp, String requestId, ServerHttpRequest request, HttpStatus httpStatus) {
        log.error("[{}][{}][uid: {}][{} {}][status: {}]", requestIp, requestId, getUserId(request), request.getMethod().name(), request.getPath().value(), httpStatus);
    }

    /**
     * 오류 로깅.
     */
    public static void error(String requestIp, String requestId, ServerHttpRequest request, HttpStatus httpStatus, Message message) {
        log.error("[{}][{}][uid: {}][{} {}][status: {}][code: {}]", requestIp, requestId, getUserId(request), request.getMethod().name(), request.getPath().value(), httpStatus, message);
    }

    /**
     * 헤더의 사용자 아이디 리턴(User-Id).
     */
    private static String getUserId(ServerHttpRequest request) {
        return request.getHeaders().getFirst(CommonConstant.HEADER_USER_ID);
    }

}
