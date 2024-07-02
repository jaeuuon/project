package kr.jaeuuon.common.basic.source.dto.response;

import kr.jaeuuon.common.basic.source.message.enumeration.Message;
import kr.jaeuuon.common.basic.source.util.Util;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ResponseDTO {

    private String path;
    private String method;
    private String status;
    private ResponseDataDTO data;
    private String timestamp;

    public ResponseDTO(String path, String method, Message message) {
        setDefault(path, method, message);

        data = new ResponseDataDTO(message);
    }

    public ResponseDTO(String path, String method, Message message, Object content) {
        setDefault(path, method, message);

        data = new ResponseDataDTO(message, content);
    }

    private void setDefault(String path, String method, Message message) {
        this.path = path;
        this.method = method;
        status = message.getStatus().getValue();
        timestamp = Util.getFormattedZonedDateTime(null);
    }

}
