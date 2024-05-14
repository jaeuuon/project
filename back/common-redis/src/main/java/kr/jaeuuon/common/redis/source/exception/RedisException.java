package kr.jaeuuon.common.redis.source.exception;

import kr.jaeuuon.common.basic.source.exception.CommonException;
import kr.jaeuuon.common.basic.source.message.enumeration.Message;

/**
 * Redis Exception.
 */
public class RedisException extends CommonException {

    public RedisException(Message message) {
        super(message);
    }

}
