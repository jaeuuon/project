package kr.jaeuuon.common.basic.source.dto.response;

import kr.jaeuuon.common.basic.source.message.enumeration.Message;
import kr.jaeuuon.common.basic.source.util.Util;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * 응답 시 사용.
 */
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ResponseDTO {

    private String path;
    private String method;
    private String status;
    private ResponseDataDTO data;
    private List<ResponseErrorDTO> errors;
    private String timestamp;

    /**
     * 성공 응답 시의 리턴.
     */
    public ResponseDTO(String path, String method, Message message, Object content) {
        setDefault(path, method, message);

        data = new ResponseDataDTO(message, content);
        errors = new ArrayList<>();
    }

    /**
     * 오류 응답 시의 리턴.
     */
    public ResponseDTO(String path, String method, Message message, ResponseErrorDTO error) {
        setDefault(path, method, message);

        data = new ResponseDataDTO();
        errors = Collections.singletonList(error);
    }

    /**
     * 오류 응답 시의 리턴.
     */
    public ResponseDTO(String path, String method, Message message, List<ResponseErrorDTO> errors) {
        setDefault(path, method, message);

        data = new ResponseDataDTO();
        this.errors = errors;
    }

    private void setDefault(String path, String method, Message message) {
        this.path = path;
        this.method = method;
        status = message.getStatus().getValue();
        timestamp = Util.getFormattedZonedDateTime(null);
    }

}
