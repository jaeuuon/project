package kr.jaeuuon.gateway.source.exception;

import kr.jaeuuon.common.basic.source.exception.CommonException;
import org.springframework.http.HttpStatus;

/**
 * Gateway Exception.
 */
public class GatewayException extends CommonException {

    public GatewayException(HttpStatus httpStatus) {
        super(httpStatus);
    }

}
