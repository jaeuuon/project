package kr.jaeuuon.common.basic.source.exception;

import kr.jaeuuon.common.basic.source.message.enumeration.Message;
import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * 공통 Exception.
 */
@Getter
public class CommonException extends RuntimeException {

    private final HttpStatus httpStatus;
    private Message customMessage;

    public CommonException() {
        httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    public CommonException(HttpStatus httpStatus) {
        this.httpStatus = httpStatus;
    }

    public CommonException(HttpStatus httpStatus, Message message) {
        this.httpStatus = httpStatus;
        customMessage = message;
    }

}
