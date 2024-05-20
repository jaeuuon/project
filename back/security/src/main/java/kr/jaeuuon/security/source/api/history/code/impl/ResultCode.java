package kr.jaeuuon.security.source.api.history.code.impl;

import kr.jaeuuon.common.basic.source.code.CommonCode;
import kr.jaeuuon.common.jpa.source.code.converter.CommonCodeConverter;
import lombok.Getter;

/**
 * 데이터 상태 코드.
 */
@Getter
public enum ResultCode implements CommonCode {

    SUCCESS("S", "성공"),

    ERROR_PASSWORD("EP", "비밀번호 불일치"),
    ERROR_DEACTIVATE("ED", "비활성화된 계정"),
    ERROR_AUTHORITIES("EA", "역할 또는 권한 정보 없음");

    private final String code;
    private final String value;

    ResultCode(String code, String value) {
        this.code = code;
        this.value = value;
    }

    public static class ResultCodeConverter extends CommonCodeConverter<ResultCode> {
        public ResultCodeConverter() {
            super(ResultCode.class);
        }
    }

}
