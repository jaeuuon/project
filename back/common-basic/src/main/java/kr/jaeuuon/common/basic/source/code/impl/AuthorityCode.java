package kr.jaeuuon.common.basic.source.code.impl;

import kr.jaeuuon.common.basic.source.code.CommonCode;
import lombok.Getter;

import java.util.stream.Stream;

/**
 * 권한 코드.
 */
@Getter
public enum AuthorityCode implements CommonCode {

    ROLE_ADMIN("ROLE_ADMIN", "관리자"),
    ROLE_USER("ROLE_USER", "사용자");

    private final String code;
    private final String value;

    AuthorityCode(String code, String value) {
        this.code = code;
        this.value = value;
    }

    public static AuthorityCode findByStringCode(String code) {
        return Stream.of(AuthorityCode.values()).filter(authorityCode -> authorityCode.name().equals(code)).findAny().orElse(null);
    }

}
