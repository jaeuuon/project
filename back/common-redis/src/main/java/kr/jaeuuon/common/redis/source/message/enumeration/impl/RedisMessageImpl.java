package kr.jaeuuon.common.redis.source.message.enumeration.impl;

import kr.jaeuuon.common.basic.source.message.enumeration.Message;
import kr.jaeuuon.common.basic.source.message.enumeration.MessageStatus;
import kr.jaeuuon.common.basic.source.message.enumeration.impl.MessageStatusImpl;
import lombok.Getter;

/**
 * 프로젝트 메시지 구현.
 */
@Getter
public enum RedisMessageImpl implements Message {

    ERROR_REDIS_001(MessageStatusImpl.ERROR, "오류가 발생했습니다. 관리자에게 문의하십시오."),
    ERROR_REDIS_002(MessageStatusImpl.ERROR, "오류가 발생했습니다. 관리자에게 문의하십시오.");

    private final MessageStatus status;
    private final String value;

    RedisMessageImpl(MessageStatus status, String value) {
        this.status = status;
        this.value = value;
    }

}
