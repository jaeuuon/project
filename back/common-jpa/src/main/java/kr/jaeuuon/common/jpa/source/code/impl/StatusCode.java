package kr.jaeuuon.common.jpa.source.code.impl;

import jakarta.persistence.Converter;
import kr.jaeuuon.common.basic.source.code.CommonCode;
import kr.jaeuuon.common.jpa.source.code.converter.CommonCodeConverter;
import lombok.Getter;

/**
 * 데이터 상태 코드.
 */
@Getter
public enum StatusCode implements CommonCode {

    ACTIVATED("A", "활성화"),
    DEACTIVATE("D", "비활성화");

    private final String code;
    private final String value;

    StatusCode(String code, String value) {
        this.code = code;
        this.value = value;
    }

    /**
     * 데이터 상태 코드 컨버터.
     */
    @Converter(autoApply = true)
    public static class StatusCodeConverter extends CommonCodeConverter<StatusCode> {

        public StatusCodeConverter() {
            super(StatusCode.class);
        }

    }

}
