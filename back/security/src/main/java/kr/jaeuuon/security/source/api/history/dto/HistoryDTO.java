package kr.jaeuuon.security.source.api.history.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategies.SnakeCaseStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.querydsl.core.annotations.QueryProjection;
import kr.jaeuuon.common.basic.source.util.Util;
import kr.jaeuuon.security.source.api.history.code.impl.ResultCode;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonNaming(SnakeCaseStrategy.class)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HistoryDTO {

    private String requestIp;
    private Long userId;
    private String result;
    private String createdTime;

    @QueryProjection
    public HistoryDTO(String requestIp, ResultCode resultCode, Timestamp createdTime) {
        this.requestIp = requestIp;
        result = resultCode.getValue();
        this.createdTime = Util.getFormattedZonedDateTime(createdTime);
    }

    @QueryProjection
    public HistoryDTO(String requestIp, Long userId, ResultCode resultCode, Timestamp createdTime) {
        this.requestIp = requestIp;
        this.userId = userId;
        result = resultCode.getValue();
        this.createdTime = Util.getFormattedZonedDateTime(createdTime);
    }

}
