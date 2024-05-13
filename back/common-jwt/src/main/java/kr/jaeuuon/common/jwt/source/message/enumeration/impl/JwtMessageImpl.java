package kr.jaeuuon.common.jwt.source.message.enumeration.impl;

import kr.jaeuuon.common.basic.source.message.enumeration.Message;
import kr.jaeuuon.common.basic.source.message.enumeration.MessageStatus;
import kr.jaeuuon.common.basic.source.message.enumeration.impl.MessageStatusImpl;
import lombok.Getter;

/**
 * 프로젝트 메시지 구현.
 */
@Getter
public enum JwtMessageImpl implements Message {

    ERROR_JWT_001(MessageStatusImpl.ERROR, "토큰이 잘못되었습니다."),
    ERROR_JWT_002(MessageStatusImpl.ERROR, "토큰이 잘못되었습니다."),
    ERROR_JWT_003(MessageStatusImpl.ERROR, "토큰이 잘못되었습니다."),
    ERROR_JWT_004(MessageStatusImpl.ERROR, "토큰이 잘못되었습니다."),
    ERROR_JWT_005(MessageStatusImpl.ERROR, "토큰이 잘못되었습니다."),
    ERROR_JWT_006(MessageStatusImpl.ERROR, "토큰이 잘못되었습니다."),
    ERROR_JWT_007(MessageStatusImpl.ERROR, "토큰이 잘못되었습니다.");

    private final MessageStatus status;
    private final String value;

    JwtMessageImpl(MessageStatus status, String value) {
        this.status = status;
        this.value = value;
    }

}
