package kr.jaeuuon.common.jwt.source.message.enumeration.impl;

import kr.jaeuuon.common.basic.source.message.enumeration.Message;
import kr.jaeuuon.common.basic.source.message.enumeration.MessageStatus;
import kr.jaeuuon.common.basic.source.message.enumeration.impl.MessageStatusImpl;
import lombok.Getter;

@Getter
public enum JwtMessageImpl implements Message {

    ERROR_JWT_EXPIRED(MessageStatusImpl.ERROR, "토큰이 만료되었습니다.");

    private final MessageStatus status;
    private final String value;

    JwtMessageImpl(MessageStatus status, String value) {
        this.status = status;
        this.value = value;
    }

}
