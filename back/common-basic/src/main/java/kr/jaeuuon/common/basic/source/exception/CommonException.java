package kr.jaeuuon.common.basic.source.exception;

import kr.jaeuuon.common.basic.source.message.enumeration.Message;
import kr.jaeuuon.common.basic.source.util.Util;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class CommonException extends RuntimeException {

    private final HttpStatus httpStatus;
    private final Message customMessage;

    public CommonException(HttpStatus httpStatus) {
        this.httpStatus = httpStatus;
        customMessage = Util.getErrorMessageByHttpStatus(httpStatus);
    }

    public CommonException(HttpStatus httpStatus, Message message) {
        this.httpStatus = httpStatus;
        customMessage = message;
    }

}
