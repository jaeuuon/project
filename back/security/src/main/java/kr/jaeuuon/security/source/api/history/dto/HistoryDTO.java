package kr.jaeuuon.security.source.api.history.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.querydsl.core.annotations.QueryProjection;
import kr.jaeuuon.common.basic.source.util.Util;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HistoryDTO {

    private String requestIp;
    private String userEmail;
    private HistoryResultDTO result;
    private String createdTime;

    @QueryProjection
    public HistoryDTO(String requestIp, HistoryResultDTO historyResultDTO, Timestamp createdTime) {
        this.requestIp = requestIp;
        result = historyResultDTO;
        this.createdTime = Util.getFormattedZonedDateTime(createdTime);
    }

    @QueryProjection
    public HistoryDTO(String requestIp, String userEmail, HistoryResultDTO historyResultDTO, Timestamp createdTime) {
        this.requestIp = requestIp;
        this.userEmail = userEmail;
        result = historyResultDTO;
        this.createdTime = Util.getFormattedZonedDateTime(createdTime);
    }

}
