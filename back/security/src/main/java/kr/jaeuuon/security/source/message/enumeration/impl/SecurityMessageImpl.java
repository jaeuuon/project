package kr.jaeuuon.security.source.message.enumeration.impl;

import kr.jaeuuon.common.basic.source.message.enumeration.Message;
import kr.jaeuuon.common.basic.source.message.enumeration.MessageStatus;
import kr.jaeuuon.common.basic.source.message.enumeration.impl.MessageStatusImpl;
import lombok.Getter;

/**
 * 프로젝트 메시지 구현.
 */
@Getter
public enum SecurityMessageImpl implements Message {

    SUCCESS_SECU_001(MessageStatusImpl.SUCCESS, "로그인에 성공했습니다."),
    SUCCESS_SECU_002(MessageStatusImpl.SUCCESS, "토큰이 재발급되었습니다."),
    SUCCESS_SECU_003(MessageStatusImpl.SUCCESS, "로그아웃 되었습니다."),

    ERROR_SECU_001(MessageStatusImpl.ERROR, "계정이 활성화되지 않았습니다."),
    ERROR_SECU_002(MessageStatusImpl.ERROR, "대상 계정을 찾을 수 없습니다. 관리자에게 문의하십시오."),
    ERROR_SECU_003(MessageStatusImpl.ERROR, "로그아웃에 실패했습니다."),

    ERROR_SECU_EMAIL_001(MessageStatusImpl.ERROR, "이메일을 입력하십시오."),
    ERROR_SECU_EMAIL_002(MessageStatusImpl.ERROR, "이메일은 4자에서 100자 사이여야 합니다."),
    ERROR_SECU_EMAIL_003(MessageStatusImpl.ERROR, "이메일 형식이 잘못되었습니다."),
    ERROR_SECU_EMAIL_004(MessageStatusImpl.ERROR, "이메일이 잘못되었습니다."),

    ERROR_SECU_PASSWORD_001(MessageStatusImpl.ERROR, "비밀번호를 입력하십시오."),
    ERROR_SECU_PASSWORD_002(MessageStatusImpl.ERROR, "비밀번호는 4자에서 50자 사이여야 합니다."),
    ERROR_SECU_PASSWORD_003(MessageStatusImpl.ERROR, "비밀번호가 잘못되었습니다."),

    ERROR_SECU_JWT_001(MessageStatusImpl.ERROR, "재발급 토큰이 비어 있습니다."),
    ERROR_SECU_JWT_002(MessageStatusImpl.ERROR, "재발급 토큰이 만료되었습니다."),
    ERROR_SECU_JWT_003(MessageStatusImpl.ERROR, "다른 기기(브라우저)에서 접속되어 토큰 재발급이 불가능합니다."),

    ERROR_SECU_AUTH_001(MessageStatusImpl.ERROR, "역할 또는 권한 정보가 없습니다.");

    private final MessageStatus status;
    private final String value;

    SecurityMessageImpl(MessageStatus status, String value) {
        this.status = status;
        this.value = value;
    }

}
