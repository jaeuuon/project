package kr.jaeuuon.common.basic.source.util;

import jakarta.servlet.http.HttpServletRequest;
import kr.jaeuuon.common.basic.source.code.impl.AuthorityCode;
import kr.jaeuuon.common.basic.source.constant.CommonConstant;
import kr.jaeuuon.common.basic.source.message.enumeration.Message;
import kr.jaeuuon.common.basic.source.message.enumeration.impl.MessageImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.ZonedDateTime;
import java.util.Arrays;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * 공통 유틸.
 */
public class Util {

    /**
     * HttpServletRequest 리턴.
     */
    public static HttpServletRequest getRequest() {
        try {
            RequestAttributes requestAttributes = RequestContextHolder.currentRequestAttributes();

            return ((ServletRequestAttributes) requestAttributes).getRequest();
        } catch (IllegalStateException e) {
            return null;
        }
    }

    /**
     * 요청 경로 리턴.
     */
    public static String getPath(HttpServletRequest request) {
        return request.getContextPath() + request.getServletPath();
    }

    /**
     * 헤더의 요청 ID 리턴(Request-Id).
     */
    public static String getRequestId(HttpServletRequest request) {
        return request.getHeader(CommonConstant.HEADER_REQUEST_ID);
    }

    /**
     * 헤더의 사용자 아이디 리턴(User-Id).
     */
    public static Long getUserId() {
        HttpServletRequest request = getRequest();

        if (request != null) {
            String userId = request.getHeader(CommonConstant.HEADER_USER_ID);

            return userId != null ? Long.parseLong(userId) : null;
        } else {
            return null;
        }
    }

    /**
     * 헤더의 사용자 아이디 리턴(User-Id).
     */
    public static Long getUserId(HttpServletRequest request) {
        String userId = request.getHeader(CommonConstant.HEADER_USER_ID);

        return userId != null ? Long.parseLong(userId) : null;
    }

    /**
     * 헤더의 사용자 아이디 리턴(User-Id).
     */
    public static String getUserId(ServerHttpRequest request) {
        return request.getHeaders().getFirst(CommonConstant.HEADER_USER_ID);
    }

    /**
     * 헤더의 사용자 권한 리턴(User-Authorities).
     */
    public static Set<AuthorityCode> getUserAuthorities(HttpServletRequest request) {
        String authorities = request.getHeader(CommonConstant.HEADER_USER_AUTHORITIES);

        return Arrays.stream(authorities.split(",")).map(AuthorityCode::findByStringCode).filter(Objects::nonNull).collect(Collectors.toSet());
    }

    /**
     * 헤더의 사용자 권한에서 역할 리턴(User-Authorities).
     */
    public static Set<AuthorityCode> getUserRoles(HttpServletRequest request) {
        Set<AuthorityCode> authorities = getUserAuthorities(request);

        return authorities.stream().filter(authority -> authority.name().startsWith("ROLE_")).collect(Collectors.toSet());
    }

    /**
     * 현재 시간을 지정된 포맷으로 변경하여 리턴.
     */
    public static ZonedDateTime getZonedDateTime() {
        return null;
    }

    /**
     * Timestamp를 지정된 포맷으로 변경하여 리턴.
     */
    public static ZonedDateTime getZonedDateTime(Timestamp timestamp) {
        return null;
    }

    /**
     * HttpStatus의 오류에 대한 메시지 리턴.
     */
    public static Message getErrorMessageByHttpStatus(HttpStatus httpStatus) {
        return switch (httpStatus) {
            case BAD_REQUEST -> MessageImpl.ERROR_BAD_REQUEST;
            case UNAUTHORIZED -> MessageImpl.ERROR_UNAUTHORIZED;
            case FORBIDDEN -> MessageImpl.ERROR_FORBIDDEN;
            case NOT_FOUND -> MessageImpl.ERROR_NOT_FOUND;
            case METHOD_NOT_ALLOWED -> MessageImpl.ERROR_METHOD_NOT_ALLOWED;
            case NOT_ACCEPTABLE -> MessageImpl.ERROR_NOT_ACCEPTABLE;
            case UNSUPPORTED_MEDIA_TYPE -> MessageImpl.ERROR_UNSUPPORTED_MEDIA_TYPE;
            case SERVICE_UNAVAILABLE -> MessageImpl.ERROR_SERVICE_UNAVAILABLE;
            default -> MessageImpl.ERROR_UNKNOWN;
        };
    }

    /**
     * 호출 클래스명, 메소드명 리턴.
     */
    public static String getCallerClassAndMethodName() {
        StackTraceElement stackTraceElement = Thread.currentThread().getStackTrace()[2];

        return stackTraceElement.getClassName() + "." + stackTraceElement.getMethodName();
    }

}
