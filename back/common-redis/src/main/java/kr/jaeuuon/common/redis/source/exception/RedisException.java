package kr.jaeuuon.common.redis.source.exception;

import kr.jaeuuon.common.basic.source.exception.CommonException;
import kr.jaeuuon.common.basic.source.message.enumeration.Message;
import org.springframework.http.HttpStatus;

/**
 * Redis Exception.
 */
public class RedisException extends CommonException {

    public RedisException(HttpStatus httpStatus, Message message) {
        super(httpStatus, message);
    }

}
