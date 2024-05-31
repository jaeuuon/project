package kr.jaeuuon.common.web.source.util;

import jakarta.servlet.http.HttpServletRequest;
import kr.jaeuuon.common.basic.source.dto.response.ResponseDTO;
import kr.jaeuuon.common.basic.source.message.enumeration.Message;
import kr.jaeuuon.common.web.source.message.enumeration.impl.WebMessageImpl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseSuccessUtil {

    public static ResponseEntity<Object> ok(HttpServletRequest request, Message message) {
        return getResponseEntity(request, null, HttpStatus.OK, message, null);
    }

    public static ResponseEntity<Object> ok(HttpServletRequest request, Object content) {
        return getResponseEntity(request, null, HttpStatus.OK, WebMessageImpl.SUCCESS_WEB_GET, content);
    }

    public static ResponseEntity<Object> ok(HttpServletRequest request, Message message, Object content) {
        return getResponseEntity(request, null, HttpStatus.OK, message, content);
    }

    public static ResponseEntity<Object> ok(HttpServletRequest request, HttpHeaders httpHeaders, Message message, Object content) {
        return getResponseEntity(request, httpHeaders, HttpStatus.OK, message, content);
    }

    public static ResponseEntity<Object> created(HttpServletRequest request) {
        return getResponseEntity(request, null, HttpStatus.CREATED, WebMessageImpl.SUCCESS_WEB_POST, null);
    }

    public static ResponseEntity<Object> patched(HttpServletRequest request) {
        return getResponseEntity(request, null, HttpStatus.CREATED, WebMessageImpl.SUCCESS_WEB_PATCH, null);
    }

    public static ResponseEntity<Object> deleted(HttpServletRequest request) {
        return getResponseEntity(request, null, HttpStatus.CREATED, WebMessageImpl.SUCCESS_WEB_DELETE, null);
    }

    private static ResponseEntity<Object> getResponseEntity(HttpServletRequest request, HttpHeaders httpHeaders, HttpStatus httpStatus, Message message, Object content) {
        ResponseDTO responseDTO = new ResponseDTO(WebUtil.getPath(request), request.getMethod(), message, content);

        return httpHeaders != null ? new ResponseEntity<>(responseDTO, httpHeaders, httpStatus) : new ResponseEntity<>(responseDTO, httpStatus);
    }

}
