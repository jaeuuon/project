package kr.jaeuuon.common.web.source.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kr.jaeuuon.common.basic.source.dto.response.ResponseDTO;
import kr.jaeuuon.common.basic.source.dto.response.ResponseErrorDTO;
import kr.jaeuuon.common.basic.source.message.enumeration.Message;
import kr.jaeuuon.common.basic.source.message.enumeration.impl.MessageImpl;
import kr.jaeuuon.common.basic.source.util.Util;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ResponseErrorUtil {

    private final ObjectMapper objectMapper;

    public static ResponseEntity<Object> error(HttpServletRequest request, HttpStatus httpStatus) {
        return getResponseEntity(request, httpStatus, null);
    }

    public static ResponseEntity<Object> error(HttpServletRequest request, HttpStatus httpStatus, Message message) {
        return getResponseEntity(request, httpStatus, message);
    }

    private static ResponseEntity<Object> getResponseEntity(HttpServletRequest request, HttpStatus httpStatus, Message message) {
        if (message == null) {
            message = Util.getErrorMessageByHttpStatus(httpStatus);
        }

        ResponseErrorDTO error = new ResponseErrorDTO(message);
        ResponseDTO responseDTO = new ResponseDTO(WebUtil.getPath(request), request.getMethod(), message, error);

        return new ResponseEntity<>(responseDTO, httpStatus);
    }

    public static ResponseEntity<Object> error(HttpServletRequest request, HttpStatus httpStatus, List<Message> messages) {
        List<ResponseErrorDTO> errors = messages.stream().map(ResponseErrorDTO::new).toList();
        ResponseDTO responseDTO = new ResponseDTO(WebUtil.getPath(request), request.getMethod(), messages.get(0), errors);

        return new ResponseEntity<>(responseDTO, httpStatus);
    }

    public void unauthorized(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Message message = MessageImpl.ERROR_BSC_UNAUTHORIZED;
        ResponseErrorDTO error = new ResponseErrorDTO(message);
        ResponseDTO responseDTO = new ResponseDTO(WebUtil.getPath(request), request.getMethod(), message, error);

        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding(StandardCharsets.UTF_8.name());
        response.getWriter().write(objectMapper.writeValueAsString(responseDTO));
    }

}
