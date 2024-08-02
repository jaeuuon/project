package kr.jaeuuon.security.source.api.history.dto;

import com.querydsl.core.annotations.QueryProjection;
import kr.jaeuuon.security.source.api.history.code.impl.ResultCode;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HistoryResultDTO {

    private String code;
    private String value;

    @QueryProjection
    public HistoryResultDTO(ResultCode resultCode) {
        code = resultCode.getCode();
        value = resultCode.getValue();
    }

}
