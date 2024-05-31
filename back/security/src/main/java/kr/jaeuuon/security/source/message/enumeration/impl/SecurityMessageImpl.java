package kr.jaeuuon.security.source.message.enumeration.impl;

import kr.jaeuuon.common.basic.source.message.enumeration.Message;
import kr.jaeuuon.common.basic.source.message.enumeration.MessageStatus;
import kr.jaeuuon.common.basic.source.message.enumeration.impl.MessageStatusImpl;
import lombok.Getter;

@Getter
public enum SecurityMessageImpl implements Message {

    SUCCESS_SCR_LOGIN(MessageStatusImpl.SUCCESS, "로그인에 성공했습니다."),
    SUCCESS_SCR_REISSUANCE(MessageStatusImpl.SUCCESS, "토큰이 재발급되었습니다."),
    SUCCESS_SCR_LOGOUT(MessageStatusImpl.SUCCESS, "로그아웃 되었습니다."),

    ERROR_SCR_NOT_ACTIVATED(MessageStatusImpl.ERROR, "계정이 활성화되지 않았습니다."),
    ERROR_SCR_LOGOUT(MessageStatusImpl.ERROR, "로그아웃에 실패했습니다."),

    ERROR_SCR_EMAIL_BLANK(MessageStatusImpl.ERROR, "이메일을 입력하십시오."),
    ERROR_SCR_EMAIL_SIZE(MessageStatusImpl.ERROR, "이메일은 4자에서 100자 사이여야 합니다."),
    ERROR_SCR_EMAIL_FORMAT(MessageStatusImpl.ERROR, "이메일 형식이 잘못되었습니다."),
    ERROR_SCR_EMAIL(MessageStatusImpl.ERROR, "이메일이 잘못되었습니다."),

    ERROR_SCR_PASSWORD_BLANK(MessageStatusImpl.ERROR, "비밀번호를 입력하십시오."),
    ERROR_SCR_PASSWORD_SIZE(MessageStatusImpl.ERROR, "비밀번호는 4자에서 50자 사이여야 합니다."),
    ERROR_SCR_PASSWORD(MessageStatusImpl.ERROR, "비밀번호가 잘못되었습니다."),

    ERROR_SCR_JWT_REFRESH_BLANK(MessageStatusImpl.ERROR, "재발급 토큰이 비어 있습니다."),
    ERROR_SCR_JWT_REFRESH_ALREADY(MessageStatusImpl.ERROR, "다른 기기(브라우저)에서 접속되어 토큰 재발급이 불가능합니다.");

    private final MessageStatus status;
    private final String value;

    SecurityMessageImpl(MessageStatus status, String value) {
        this.status = status;
        this.value = value;
    }

}
