package kr.jaeuuon.security.source.security.exception;

import kr.jaeuuon.common.basic.source.exception.CommonException;
import kr.jaeuuon.common.basic.source.message.enumeration.Message;
import kr.jaeuuon.security.source.api.history.code.impl.ResultCode;
import kr.jaeuuon.security.source.security.userdetails.impl.UserDetailsImpl;
import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * Security Exception.
 */
@Getter
public class SecurityException extends CommonException {

    private UserDetailsImpl userDetailsImpl;
    private ResultCode resultCode;

    public SecurityException(HttpStatus httpStatus, Message message) {
        super(httpStatus, message);
    }

    public SecurityException(HttpStatus httpStatus, Message message, UserDetailsImpl userDetailsImpl, ResultCode resultCode) {
        super(httpStatus, message);

        this.userDetailsImpl = userDetailsImpl;
        this.resultCode = resultCode;
    }

}
