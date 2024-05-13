package kr.jaeuuon.common.web.source.exception;

import kr.jaeuuon.common.basic.source.exception.CommonException;
import org.springframework.http.HttpStatus;

/**
 * HasRole Exception.
 */
public class HasRoleException extends CommonException {

    public HasRoleException() {
        super();
    }

    public HasRoleException(HttpStatus httpStatus) {
        super(httpStatus);
    }

}
