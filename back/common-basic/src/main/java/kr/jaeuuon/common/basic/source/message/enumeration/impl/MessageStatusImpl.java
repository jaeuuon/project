package kr.jaeuuon.common.basic.source.message.enumeration.impl;

import kr.jaeuuon.common.basic.source.message.enumeration.MessageStatus;
import lombok.Getter;

/**
 * 메시지 상태 구현.
 */
@Getter
public enum MessageStatusImpl implements MessageStatus {

    SUCCESS("SUCCESS", "성공"),
    ERROR("ERROR", "실패");

    private final String code;
    private final String value;

    MessageStatusImpl(String code, String value) {
        this.code = code;
        this.value = value;
    }

}
