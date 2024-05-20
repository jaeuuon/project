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
import java.time.ZonedDateTime;

/**
 * 사용자 인증 기록 조회 시 사용.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonNaming(SnakeCaseStrategy.class)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HistoryDTO {

    private String requestIp;
    private Long userId;
    private String result;
    private ZonedDateTime createdTime;

    /**
     * 사용자 인증 기록 조회(본인) 시의 리턴.
     */
    @QueryProjection
    public HistoryDTO(String requestIp, ResultCode resultCode, Timestamp createdTime) {
        this.requestIp = requestIp;
        result = resultCode.getValue();
        this.createdTime = Util.getZonedDateTime(createdTime);
    }

    /**
     * 사용자 인증 기록 조회(특정 사용자) 시의 리턴.
     */
    @QueryProjection
    public HistoryDTO(String requestIp, Long userId, ResultCode resultCode, Timestamp createdTime) {
        this.requestIp = requestIp;
        this.userId = userId;
        result = resultCode.getValue();
        this.createdTime = Util.getZonedDateTime(createdTime);
    }

}