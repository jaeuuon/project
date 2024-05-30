package kr.jaeuuon.common.web.source.handler;

import jakarta.servlet.http.HttpServletRequest;
import kr.jaeuuon.common.basic.source.exception.CommonException;
import kr.jaeuuon.common.basic.source.logger.CommonLogger;
import kr.jaeuuon.common.basic.source.message.enumeration.Message;
import kr.jaeuuon.common.basic.source.message.enumeration.impl.MessageImpl;
import kr.jaeuuon.common.basic.source.util.Util;
import kr.jaeuuon.common.web.source.message.service.MessageService;
import kr.jaeuuon.common.web.source.util.ResponseErrorUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 오류 처리.
 */
@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class ResponseExceptionHandler extends ResponseEntityExceptionHandler {

    /**
     * Valid 어노테이션 중 아래에 해당하는 경우에만 메시지를 찾음.
     */
    private static final List<String> USED_VALIDS = List.of("Email", "NotBlank", "Pattern", "Size");

    private final MessageService messageService;

    /**
     * ResponseEntityExceptionHandler 오류 응답 공통화.
     */
    @Override
    protected ResponseEntity<Object> handleExceptionInternal(@NonNull Exception ex, Object body, @NonNull HttpHeaders headers, @NonNull HttpStatusCode statusCode, @NonNull WebRequest webRequest) {
        HttpServletRequest request = ((ServletWebRequest) webRequest).getRequest();
        HttpStatus httpStatus = (HttpStatus) statusCode;

        if (ex instanceof MethodArgumentNotValidException subEx) {
            List<FieldError> fieldErrors = subEx.getFieldErrors();
            List<Message> messages = getMessagesByFieldErrors(fieldErrors);

            CommonLogger.error(request, Util.getCallerClassAndMethodName(), ex.getClass().getSimpleName(), messages);

            return ResponseErrorUtil.error(request, httpStatus, messages);
        } else {
            CommonLogger.error(request.getRemoteAddr(), Util.getRequestId(request), Util.getCallerClassAndMethodName(), ex.getClass().getSimpleName(), ex.getMessage());

            return ResponseErrorUtil.error(request, httpStatus);
        }
    }

    /**
     * Valid 어노테이션의 message 값에 해당하는 Message 목록 리턴.
     */
    private List<Message> getMessagesByFieldErrors(List<FieldError> fieldErrors) {
        return fieldErrors.stream().map(fieldError -> USED_VALIDS.contains(fieldError.getCode()) ? messageService.getByName(fieldError.getDefaultMessage()) : MessageImpl.ERROR_BAD_REQUEST).collect(Collectors.toList());
    }

    /**
     * 오류 처리.
     */
    @ExceptionHandler(Exception.class)
    protected ResponseEntity<Object> handleException(HttpServletRequest request, Exception e) {
        CommonLogger.error(request.getRemoteAddr(), Util.getRequestId(request), Util.getCallerClassAndMethodName(), e.getClass().getSimpleName(), e);

        return ResponseErrorUtil.error(request, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * null 호출 오류 처리.
     */
    @ExceptionHandler(NullPointerException.class)
    protected ResponseEntity<Object> handleNullPointerException(HttpServletRequest request, NullPointerException e) {
        CommonLogger.error(request.getRemoteAddr(), Util.getRequestId(request), Util.getCallerClassAndMethodName(), e.getClass().getSimpleName(), e);

        return ResponseErrorUtil.error(request, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * 공통 오류 처리.
     */
    @ExceptionHandler(CommonException.class)
    protected ResponseEntity<Object> handleCommonException(HttpServletRequest request, CommonException e) {
        CommonLogger.error(request.getRemoteAddr(), Util.getRequestId(request), Util.getCallerClassAndMethodName(), e.getClass().getSimpleName(), e.getCustomMessage());

        return ResponseErrorUtil.error(request, e.getHttpStatus(), e.getCustomMessage());
    }

}
