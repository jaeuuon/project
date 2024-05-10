package kr.jaeuuon.common.jpa.source.code.converter;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Convert;
import kr.jaeuuon.common.basic.source.code.CommonCode;

import java.util.stream.Stream;

/**
 * 공통 코드 컨버터(객체 ↔ 데이터베이스).
 */
@Convert
public abstract class CommonCodeConverter<T extends CommonCode> implements AttributeConverter<T, String> {

    private final Class<T> type;

    public CommonCodeConverter(Class<T> type) {
        this.type = type;
    }

    @Override
    public String convertToDatabaseColumn(T attribute) {
        return attribute.getCode();
    }

    @Override
    public T convertToEntityAttribute(String dbData) {
        return Stream.of(type.getEnumConstants()).filter(code -> code.getCode().equals(dbData)).findAny().orElse(null);
    }

}
