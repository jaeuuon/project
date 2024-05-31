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

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class ResponseExceptionHandler extends ResponseEntityExceptionHandler {

    private static final List<String> USED_VALIDS = List.of("Email", "NotBlank", "Pattern", "Size");

    private final MessageService messageService;

    private static String getCallerClassAndMethodName() {
        StackTraceElement stackTraceElement = Thread.currentThread().getStackTrace()[2];

        return stackTraceElement.getClassName() + "." + stackTraceElement.getMethodName();
    }

    @Override
    protected ResponseEntity<Object> handleExceptionInternal(@NonNull Exception e, Object body, @NonNull HttpHeaders headers, @NonNull HttpStatusCode statusCode, @NonNull WebRequest webRequest) {
        HttpServletRequest request = ((ServletWebRequest) webRequest).getRequest();
        HttpStatus httpStatus = (HttpStatus) statusCode;

        if (e instanceof MethodArgumentNotValidException subEx) {
            List<FieldError> fieldErrors = subEx.getFieldErrors();
            List<Message> messages = fieldErrors.stream().map(this::getMessage).collect(Collectors.toList());
            String codes = messages.stream().map(Object::toString).collect(Collectors.joining(","));

            log.error("[{}][{}][{}: {}][codes: {}]", request.getRemoteAddr(), Util.getRequestId(request), getCallerClassAndMethodName(), subEx.getClass().getSimpleName(), codes);

            return ResponseErrorUtil.error(request, httpStatus, messages);
        } else {
            CommonLogger.logging(request, e);

            return ResponseErrorUtil.error(request, httpStatus);
        }
    }

    private Message getMessage(FieldError fieldError) {
        return USED_VALIDS.contains(fieldError.getCode()) ? messageService.getByName(fieldError.getDefaultMessage()) : MessageImpl.ERROR_BSC_BAD_REQUEST;
    }

    @ExceptionHandler(Exception.class)
    protected ResponseEntity<Object> handleException(HttpServletRequest request, Exception e) {
        CommonLogger.loggingDetail(request, e);

        return ResponseErrorUtil.error(request, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(CommonException.class)
    protected ResponseEntity<Object> handleCommonException(HttpServletRequest request, CommonException ce) {
        Message message = ce.getCustomMessage();

        log.error("[{}][{}][{}: {}({})][code: {}]", request.getRemoteAddr(), Util.getRequestId(request), getCallerClassAndMethodName(), ce.getClass().getSimpleName(), message.getValue(), message);

        return ResponseErrorUtil.error(request, ce.getHttpStatus(), ce.getCustomMessage());
    }

}
