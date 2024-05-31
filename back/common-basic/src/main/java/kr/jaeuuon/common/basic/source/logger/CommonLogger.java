package kr.jaeuuon.common.basic.source.logger;

import jakarta.servlet.http.HttpServletRequest;
import kr.jaeuuon.common.basic.source.util.Util;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CommonLogger {

    public static void logging(HttpServletRequest request, Exception e) {
        log.error("[{}][{}][{}: {}({})]", request.getRemoteAddr(), Util.getRequestId(request), getCallerClassAndMethodName(), e.getClass().getSimpleName(), e.getMessage());
    }

    public static void loggingDetail(HttpServletRequest request, Exception e) {
        log.error("[{}][{}][{}: {}]", request.getRemoteAddr(), Util.getRequestId(request), getCallerClassAndMethodName(), e.getClass().getSimpleName(), e);
    }

    private static String getCallerClassAndMethodName() {
        StackTraceElement stackTraceElement = Thread.currentThread().getStackTrace()[3];

        return stackTraceElement.getClassName() + "." + stackTraceElement.getMethodName();
    }

}
