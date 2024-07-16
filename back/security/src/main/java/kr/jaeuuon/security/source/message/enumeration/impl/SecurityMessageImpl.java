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
    ERROR_SCR_EMAIL_WRONG(MessageStatusImpl.ERROR, "이메일이 잘못되었습니다."),

    ERROR_SCR_PASSWORD_BLANK(MessageStatusImpl.ERROR, "비밀번호를 입력하십시오."),
    ERROR_SCR_PASSWORD_ENCRYPT_SIZE(MessageStatusImpl.ERROR, "비밀번호의 길이가 잘못되었습니다."),
    ERROR_SCR_PASSWORD_DECRYPT_SIZE(MessageStatusImpl.ERROR, "비밀번호는 4자에서 50자 사이여야 합니다."),
    ERROR_SCR_PASSWORD_DECRYPT(MessageStatusImpl.ERROR, "비밀번호를 비교하는 중에 문제가 발생했습니다. 관리자에게 문의하십시오."),
    ERROR_SCR_PASSWORD_WRONG(MessageStatusImpl.ERROR, "비밀번호가 잘못되었습니다.");

    private final MessageStatus status;
    private final String value;

    SecurityMessageImpl(MessageStatus status, String value) {
        this.status = status;
        this.value = value;
    }

}
