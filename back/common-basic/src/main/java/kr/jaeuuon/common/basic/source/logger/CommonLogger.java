package kr.jaeuuon.common.basic.source.logger;

import jakarta.servlet.http.HttpServletRequest;
import kr.jaeuuon.common.basic.source.exception.CommonException;
import kr.jaeuuon.common.basic.source.message.enumeration.Message;
import kr.jaeuuon.common.basic.source.util.Util;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 공통 로깅.
 */
@Slf4j
public class CommonLogger {

    /**
     * 오류(Exception) 로깅.
     */
    public static void logging(HttpServletRequest request, Exception e) {
        log.error("[{}][{}][{}: {}({})]", request.getRemoteAddr(), Util.getRequestId(request), Util.getCallerClassAndMethodName(), e.getClass().getSimpleName(), e.getMessage());
    }

    /**
     * 오류(Exception) 상세 로깅.
     */
    public static void loggingDetail(HttpServletRequest request, Exception e) {
        log.error("[{}][{}][{}: {}]", request.getRemoteAddr(), Util.getRequestId(request), Util.getCallerClassAndMethodName(), e.getClass().getSimpleName(), e);
    }

}
