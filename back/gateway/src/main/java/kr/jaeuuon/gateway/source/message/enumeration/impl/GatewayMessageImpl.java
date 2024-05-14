package kr.jaeuuon.gateway.source.message.enumeration.impl;

import kr.jaeuuon.common.basic.source.message.enumeration.Message;
import kr.jaeuuon.common.basic.source.message.enumeration.MessageStatus;
import kr.jaeuuon.common.basic.source.message.enumeration.impl.MessageStatusImpl;
import lombok.Getter;

/**
 * 프로젝트 메시지 구현.
 */
@Getter
public enum GatewayMessageImpl implements Message {

    ERROR_GATE_AUTH_001(MessageStatusImpl.ERROR, "역할 또는 권한이 없습니다.");

    private final MessageStatus status;
    private final String value;

    GatewayMessageImpl(MessageStatus status, String value) {
        this.status = status;
        this.value = value;
    }

}
