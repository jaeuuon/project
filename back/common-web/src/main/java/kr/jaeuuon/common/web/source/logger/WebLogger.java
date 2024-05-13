package kr.jaeuuon.common.web.source.logger;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import kr.jaeuuon.common.basic.source.dto.response.ResponseDTO;
import kr.jaeuuon.common.basic.source.dto.response.ResponseErrorDTO;
import kr.jaeuuon.common.basic.source.logger.CommonLogger;
import kr.jaeuuon.common.basic.source.util.Util;
import kr.jaeuuon.common.web.properties.WithoutParameterProperties;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

import java.io.IOException;
import java.util.Collection;
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
public class WebLogger {

    private final ObjectMapper objectMapper;

    private final WithoutParameterProperties withoutParameterProperties;

    /**
     * 요청 및 응답 로깅.
     */
    public void info(ContentCachingRequestWrapper request, ContentCachingResponseWrapper response, long startTime) {
        HttpStatus httpStatus = HttpStatus.resolve(response.getStatus());
        String processingTime = String.format("%,.3f s", (System.currentTimeMillis() - startTime) * 0.001);

        if (httpStatus != null && !httpStatus.isError()) {
            log.info("[{}][{}][uid: {}][{} {}{}][status: {}][processing time: {}]", request.getRemoteAddr(), Util.getRequestId(request), Util.getUserId(request), request.getMethod(), request.getContextPath(), request.getServletPath(), httpStatus, processingTime);
        } else {
            error(request, response, httpStatus, processingTime);
        }
    }

    private void error(ContentCachingRequestWrapper request, ContentCachingResponseWrapper response, HttpStatus httpStatus, String processingTime) {
        try {
            ResponseDTO responseDTO = objectMapper.readValue(response.getContentAsByteArray(), ResponseDTO.class);
            Collection<ResponseErrorDTO> errors = responseDTO.getErrors();
            String codes = errors.stream().map(ResponseErrorDTO::getCode).collect(Collectors.joining(","));

            if (withoutParameterProperties.isWithout(request.getMethod(), request.getServletPath())) {
                log.error("[{}][{}][uid: {}][{} {}{}][status: {}][codes: {}][processing time: {}]", request.getRemoteAddr(), Util.getRequestId(request), Util.getUserId(request), request.getMethod(), request.getContextPath(), request.getServletPath(), httpStatus, codes, processingTime);
            } else {
                errorByContentType(request, httpStatus, codes, processingTime);
            }
        } catch (IOException e) {
            CommonLogger.error(request.getRemoteAddr(), Util.getRequestId(request), Util.getCallerClassAndMethodName(), e.getClass().getSimpleName(), e);
            error(request, httpStatus, null, processingTime);
        }
    }

    private void errorByContentType(ContentCachingRequestWrapper request, HttpStatus httpStatus, String codes, String processingTime) throws IOException {
        String contentType = request.getContentType();

        if (contentType != null) {
            if (contentType.equals(MediaType.APPLICATION_JSON_VALUE)) {
                JsonNode content = objectMapper.readTree(request.getContentAsByteArray());

                log.error("[{}][{}][uid: {}][{} {}{}][content: {}][status: {}][codes: {}][processing time: {}]", request.getRemoteAddr(), Util.getRequestId(request), Util.getUserId(request), request.getMethod(), request.getContextPath(), request.getServletPath(), content, httpStatus, codes, processingTime);
            } else {
                log.error("[{}][{}][uid: {}][{} {}{}][content type: {}][status: {}][codes: {}][processing time: {}]", request.getRemoteAddr(), Util.getRequestId(request), Util.getUserId(request), request.getMethod(), request.getContextPath(), request.getServletPath(), contentType, httpStatus, codes, processingTime);
            }
        } else {
            error(request, httpStatus, codes, processingTime);
        }
    }

    private void error(ContentCachingRequestWrapper request, HttpStatus httpStatus, String codes, String processingTime) {
        String query = request.getQueryString();

        if (query != null) {
            log.error("[{}][{}][uid: {}][{} {}{}?{}][status: {}][codes: {}][processing time: {}]", request.getRemoteAddr(), Util.getRequestId(request), Util.getUserId(request), request.getMethod(), request.getContextPath(), request.getServletPath(), query, httpStatus, codes, processingTime);
        } else {
            log.error("[{}][{}][uid: {}][{} {}{}][status: {}][codes: {}][processing time: {}]", request.getRemoteAddr(), Util.getRequestId(request), Util.getUserId(request), request.getMethod(), request.getContextPath(), request.getServletPath(), httpStatus, codes, processingTime);
        }
    }

}
