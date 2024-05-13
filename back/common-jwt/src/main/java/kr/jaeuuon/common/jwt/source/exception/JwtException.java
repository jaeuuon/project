package kr.jaeuuon.common.jwt.source.exception;

import kr.jaeuuon.common.basic.source.exception.CommonException;
import kr.jaeuuon.common.basic.source.message.enumeration.Message;
import org.springframework.http.HttpStatus;

/**
 * JWT Exception.
 */
public class JwtException extends CommonException {

    public JwtException(HttpStatus httpStatus, Message message) {
        super(httpStatus, message);
    }

}
