package kr.jaeuuon.common.basic.source.message.enumeration.impl;

import kr.jaeuuon.common.basic.source.message.enumeration.Message;
import kr.jaeuuon.common.basic.source.message.enumeration.MessageStatus;
import lombok.Getter;

/**
 * 프로젝트 메시지 구현.
 */
@Getter
public enum MessageImpl implements Message {

    ERROR_BSC_BAD_REQUEST(MessageStatusImpl.ERROR, "요청이 잘못되었습니다."),
    ERROR_BSC_UNAUTHORIZED(MessageStatusImpl.ERROR, "유효한 인증 자격 증명이 없습니다."),
    ERROR_BSC_FORBIDDEN(MessageStatusImpl.ERROR, "역할 또는 권한이 없습니다."),
    ERROR_BSC_NOT_FOUND(MessageStatusImpl.ERROR, "요청한 경로를 찾을 수 없습니다."),
    ERROR_BSC_METHOD_NOT_ALLOWED(MessageStatusImpl.ERROR, "지원되지 않는 메서드입니다."),
    ERROR_BSC_NOT_ACCEPTABLE(MessageStatusImpl.ERROR, "응답을 생성할 수 없습니다."),
    ERROR_BSC_UNSUPPORTED_MEDIA_TYPE(MessageStatusImpl.ERROR, "지원되지 않는 미디어 유형입니다."),
    ERROR_BSC_INTERNAL_SERVER_ERROR(MessageStatusImpl.ERROR, "문제가 발생했습니다. 관리자에게 문의하십시오."),
    ERROR_BSC_SERVICE_UNAVAILABLE(MessageStatusImpl.ERROR, "서비스를 이용할 수 없습니다. 관리자에게 문의하십시오."),

    ERROR_BSC_UNKNOWN(MessageStatusImpl.ERROR, "알 수 없는 문제가 발생했습니다. 관리자에게 문의하십시오."),

    ERROR_BSC_USER_NOT_FOUND(MessageStatusImpl.ERROR, "대상 계정을 찾을 수 없습니다. 관리자에게 문의하십시오.");

    private final MessageStatus status;
    private final String value;

    MessageImpl(MessageStatus status, String value) {
        this.status = status;
        this.value = value;
    }

}
