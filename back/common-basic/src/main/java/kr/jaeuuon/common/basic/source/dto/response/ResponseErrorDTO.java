package kr.jaeuuon.common.basic.source.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import kr.jaeuuon.common.basic.source.message.enumeration.Message;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ResponseErrorDTO {

    private String code;
    private String message;

    public ResponseErrorDTO(Message message) {
        code = message.toString();
        this.message = message.getValue();
    }

}
