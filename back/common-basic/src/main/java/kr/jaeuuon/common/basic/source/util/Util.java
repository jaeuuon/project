package kr.jaeuuon.common.basic.source.util;

import jakarta.servlet.http.HttpServletRequest;
import kr.jaeuuon.common.basic.source.code.impl.AuthorityCode;
import kr.jaeuuon.common.basic.source.constant.CommonConstant;
import kr.jaeuuon.common.basic.source.message.enumeration.Message;
import kr.jaeuuon.common.basic.source.message.enumeration.impl.MessageImpl;
import org.springframework.http.HttpStatus;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.sql.Timestamp;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

public class Util {

    private static final ZoneId ZONE_ID = ZoneId.of("UTC+9");
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSSZ");

    public static HttpServletRequest getRequest() {
        try {
            RequestAttributes requestAttributes = RequestContextHolder.currentRequestAttributes();

            return ((ServletRequestAttributes) requestAttributes).getRequest();
        } catch (IllegalStateException e) {
            return null;
        }
    }

    public static String getRequestId(HttpServletRequest request) {
        return request.getHeader(CommonConstant.HEADER_REQUEST_ID);
    }

    public static Long getUserId(HttpServletRequest request) {
        if (request != null) {
            String userId = request.getHeader(CommonConstant.HEADER_USER_ID);

            return userId != null ? Long.parseLong(userId) : null;
        } else {
            return null;
        }
    }

    public static Set<AuthorityCode> getUserAuthorities(HttpServletRequest request) {
        String authorities = request.getHeader(CommonConstant.HEADER_USER_AUTHORITIES);

        return Arrays.stream(authorities.split(",")).map(AuthorityCode::findByStringCode).filter(Objects::nonNull).collect(Collectors.toSet());
    }

    public static String getFormattedZonedDateTime(Timestamp timestamp) {
        if (timestamp != null) {
            return ZonedDateTime.ofInstant(timestamp.toInstant(), ZONE_ID).format(DATE_TIME_FORMATTER);
        } else {
            return ZonedDateTime.now(ZONE_ID).format(DATE_TIME_FORMATTER);
        }
    }

    public static Message getErrorMessageByHttpStatus(HttpStatus httpStatus) {
        return switch (httpStatus) {
            case BAD_REQUEST -> MessageImpl.ERROR_BSC_BAD_REQUEST;
            case UNAUTHORIZED -> MessageImpl.ERROR_BSC_UNAUTHORIZED;
            case FORBIDDEN -> MessageImpl.ERROR_BSC_FORBIDDEN;
            case NOT_FOUND -> MessageImpl.ERROR_BSC_NOT_FOUND;
            case METHOD_NOT_ALLOWED -> MessageImpl.ERROR_BSC_METHOD_NOT_ALLOWED;
            case NOT_ACCEPTABLE -> MessageImpl.ERROR_BSC_NOT_ACCEPTABLE;
            case UNSUPPORTED_MEDIA_TYPE -> MessageImpl.ERROR_BSC_UNSUPPORTED_MEDIA_TYPE;
            case INTERNAL_SERVER_ERROR -> MessageImpl.ERROR_BSC_INTERNAL_SERVER_ERROR;
            case SERVICE_UNAVAILABLE -> MessageImpl.ERROR_BSC_SERVICE_UNAVAILABLE;
            default -> MessageImpl.ERROR_BSC_UNKNOWN;
        };
    }

}
