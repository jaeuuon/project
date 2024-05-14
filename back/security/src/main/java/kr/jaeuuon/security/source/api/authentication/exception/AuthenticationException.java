package kr.jaeuuon.security.source.api.authentication.exception;

import kr.jaeuuon.common.basic.source.exception.CommonException;
import kr.jaeuuon.common.basic.source.message.enumeration.Message;
import org.springframework.http.HttpStatus;

/**
 * 로그인/재발급/로그아웃 Exception.
 */
public class AuthenticationException extends CommonException {

    public AuthenticationException(HttpStatus httpStatus, Message message) {
        super(httpStatus, message);
    }

}
