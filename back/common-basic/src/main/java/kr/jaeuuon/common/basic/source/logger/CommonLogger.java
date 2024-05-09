package kr.jaeuuon.common.basic.source.logger;

import jakarta.servlet.http.HttpServletRequest;
import kr.jaeuuon.common.basic.source.message.enumeration.Message;
import kr.jaeuuon.common.basic.source.util.Util;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 공통 로깅.
 */
@Slf4j
public class CommonLogger {

    /**
     * 상세 오류(Exception) 로깅.
     */
    public static void error(String requestIp, String requestId, String callerClassAndMethodName, String exceptionClassName, Exception e) {
        log.error("[{}][{}][{}: {}]", requestIp, requestId, callerClassAndMethodName, exceptionClassName, e);
    }

    /**
     * 상세 오류(Throwable.getMessage) 로깅.
     */
    public static void error(String requestIp, String requestId, String callerClassAndMethodName, String exceptionClassName, String message) {
        log.error("[{}][{}][{}: {}({})]", requestIp, requestId, callerClassAndMethodName, exceptionClassName, message);
    }

    /**
     * 상세 오류(Message) 로깅.
     */
    public static void error(String requestIp, String requestId, String callerClassAndMethodName, String exceptionClassName, Message message) {
        String messageValue = message != null ? message.getValue() : null;

        log.error("[{}][{}][{}: {}({})][code: {}]", requestIp, requestId, callerClassAndMethodName, exceptionClassName, messageValue, message);
    }

    /**
     * 상세 오류(List<Message>) 로깅.
     */
    public static void error(HttpServletRequest request, String callerClassAndMethodName, String exceptionClassName, List<Message> messages) {
        String codes = messages.stream().map(Object::toString).collect(Collectors.joining(", "));

        log.error("[{}][{}][{}: {}][codes: {}]", request.getRemoteAddr(), Util.getRequestId(request), callerClassAndMethodName, exceptionClassName, codes);
    }

}
