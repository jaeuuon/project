package kr.jaeuuon.common.web.source.filter;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kr.jaeuuon.common.basic.source.dto.response.ResponseDTO;
import kr.jaeuuon.common.basic.source.dto.response.ResponseErrorDTO;
import kr.jaeuuon.common.basic.source.logger.CommonLogger;
import kr.jaeuuon.common.basic.source.util.Util;
import kr.jaeuuon.common.web.properties.WithoutParameterProperties;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

import java.io.IOException;
import java.util.Collection;
import java.util.stream.Collectors;

@Slf4j
@Order(Ordered.HIGHEST_PRECEDENCE)
@Component
@RequiredArgsConstructor
public class ContentCachingWrapperFilter extends OncePerRequestFilter {

    private final ObjectMapper objectMapper;

    private final WithoutParameterProperties withoutParameterProperties;

    /**
     * HttpServletRequest → ContentCachingWrapperFilter 변환 및 로깅.
     */
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        ContentCachingRequestWrapper cachingRequest = new ContentCachingRequestWrapper(request);
        ContentCachingResponseWrapper cachingResponse = new ContentCachingResponseWrapper(response);

        long startTime = System.currentTimeMillis();

        filterChain.doFilter(cachingRequest, cachingResponse);

        logging(cachingRequest, cachingResponse, startTime);

        cachingResponse.copyBodyToResponse();
    }

    /**
     * 요청 및 응답 로깅.
     */
    public void logging(ContentCachingRequestWrapper request, ContentCachingResponseWrapper response, long startTime) {
        HttpStatus httpStatus = HttpStatus.resolve(response.getStatus());
        String processingTime = String.format("%,.3f s", (System.currentTimeMillis() - startTime) * 0.001);

        if (httpStatus != null && !httpStatus.isError()) {
            log.info("[{}][{}][uid: {}][{} {}{}][status: {}][processing time: {}]", request.getRemoteAddr(), Util.getRequestId(request), Util.getUserId(request), request.getMethod(), request.getContextPath(), request.getServletPath(), httpStatus, processingTime);
        } else {
            try {
                ResponseDTO responseDTO = objectMapper.readValue(response.getContentAsByteArray(), ResponseDTO.class);
                Collection<ResponseErrorDTO> errors = responseDTO.getErrors();
                String codes = errors.stream().map(ResponseErrorDTO::getCode).collect(Collectors.joining(","));

                if (withoutParameterProperties.isWithout(request.getMethod(), request.getServletPath())) {
                    loggingDefault(request, httpStatus, codes, processingTime);
                } else {
                    String contentType = request.getContentType();

                    if (contentType != null) {
                        if (contentType.equals(MediaType.APPLICATION_JSON_VALUE)) {
                            JsonNode content = objectMapper.readTree(request.getContentAsByteArray());

                            log.error("[{}][{}][uid: {}][{} {}{}][content: {}][status: {}][codes: {}][processing time: {}]", request.getRemoteAddr(), Util.getRequestId(request), Util.getUserId(request), request.getMethod(), request.getContextPath(), request.getServletPath(), content, httpStatus, codes, processingTime);
                        } else {
                            log.error("[{}][{}][uid: {}][{} {}{}][content type: {}][status: {}][codes: {}][processing time: {}]", request.getRemoteAddr(), Util.getRequestId(request), Util.getUserId(request), request.getMethod(), request.getContextPath(), request.getServletPath(), contentType, httpStatus, codes, processingTime);
                        }
                    } else {
                        logging(request, httpStatus, codes, processingTime);
                    }
                }
            } catch (IOException e) {
                CommonLogger.loggingDetail(request, e);
                logging(request, httpStatus, null, processingTime);
            }
        }
    }

    private void logging(ContentCachingRequestWrapper request, HttpStatus httpStatus, String codes, String processingTime) {
        String query = request.getQueryString();

        if (query != null) {
            log.error("[{}][{}][uid: {}][{} {}{}?{}][status: {}][codes: {}][processing time: {}]", request.getRemoteAddr(), Util.getRequestId(request), Util.getUserId(request), request.getMethod(), request.getContextPath(), request.getServletPath(), query, httpStatus, codes, processingTime);
        } else {
            loggingDefault(request, httpStatus, codes, processingTime);
        }
    }

    private void loggingDefault(ContentCachingRequestWrapper request, HttpStatus httpStatus, String codes, String processingTime) {
        log.error("[{}][{}][uid: {}][{} {}{}][status: {}][codes: {}][processing time: {}]", request.getRemoteAddr(), Util.getRequestId(request), Util.getUserId(request), request.getMethod(), request.getContextPath(), request.getServletPath(), httpStatus, codes, processingTime);
    }

}
