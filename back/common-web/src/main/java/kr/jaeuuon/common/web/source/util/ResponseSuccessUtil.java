package kr.jaeuuon.common.web.source.util;

import jakarta.servlet.http.HttpServletRequest;
import kr.jaeuuon.common.basic.source.dto.response.ResponseDTO;
import kr.jaeuuon.common.basic.source.message.enumeration.Message;
import kr.jaeuuon.common.web.source.message.enumeration.impl.WebMessageImpl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

/**
 * 공통 응답(성공) 유틸.
 */
public class ResponseSuccessUtil {

    /**
     * 200에 대한 ResponseEntity 리턴(메시지).
     */
    public static ResponseEntity<Object> ok(HttpServletRequest request, Message message) {
        return getResponseEntity(request, null, HttpStatus.OK, message, null);
    }

    /**
     * 200에 대한 ResponseEntity 리턴(컨텐츠).
     */
    public static ResponseEntity<Object> ok(HttpServletRequest request, Object content) {
        return getResponseEntity(request, null, HttpStatus.OK, WebMessageImpl.SUCCESS_WEB_GET, content);
    }

    /**
     * 200에 대한 ResponseEntity 리턴(메시지, 컨텐츠).
     */
    public static ResponseEntity<Object> ok(HttpServletRequest request, Message message, Object content) {
        return getResponseEntity(request, null, HttpStatus.OK, message, content);
    }

    /**
     * 200에 대한 ResponseEntity 리턴(헤더, 메시지, 컨텐츠).
     */
    public static ResponseEntity<Object> ok(HttpServletRequest request, HttpHeaders httpHeaders, Message message, Object content) {
        return getResponseEntity(request, httpHeaders, HttpStatus.OK, message, content);
    }

    /**
     * 201에 대한 ResponseEntity 리턴(등록).
     */
    public static ResponseEntity<Object> created(HttpServletRequest request) {
        return getResponseEntity(request, null, HttpStatus.CREATED, WebMessageImpl.SUCCESS_WEB_POST, null);
    }

    /**
     * 201에 대한 ResponseEntity 리턴(수정).
     */
    public static ResponseEntity<Object> patched(HttpServletRequest request) {
        return getResponseEntity(request, null, HttpStatus.CREATED, WebMessageImpl.SUCCESS_WEB_PATCH, null);
    }

    /**
     * 201에 대한 ResponseEntity 리턴(삭제).
     */
    public static ResponseEntity<Object> deleted(HttpServletRequest request) {
        return getResponseEntity(request, null, HttpStatus.CREATED, WebMessageImpl.SUCCESS_WEB_DELETE, null);
    }

    /**
     * 200, 201에 대한 ResponseEntity 리턴.
     */
    private static ResponseEntity<Object> getResponseEntity(HttpServletRequest request, HttpHeaders httpHeaders, HttpStatus httpStatus, Message message, Object content) {
        ResponseDTO responseDTO = new ResponseDTO(WebUtil.getPath(request), request.getMethod(), message, content);

        return httpHeaders != null ? new ResponseEntity<>(responseDTO, httpHeaders, httpStatus) : new ResponseEntity<>(responseDTO, httpStatus);
    }

}
