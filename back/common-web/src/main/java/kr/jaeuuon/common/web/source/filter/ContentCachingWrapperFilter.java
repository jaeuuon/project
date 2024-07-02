package kr.jaeuuon.common.web.source.filter;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kr.jaeuuon.common.basic.source.dto.response.ResponseDTO;
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

@Slf4j
@Order(Ordered.HIGHEST_PRECEDENCE)
@Component
@RequiredArgsConstructor
public class ContentCachingWrapperFilter extends OncePerRequestFilter {

    private final ObjectMapper objectMapper;

    private final WithoutParameterProperties withoutParameterProperties;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        ContentCachingRequestWrapper cachingRequest = new ContentCachingRequestWrapper(request);
        ContentCachingResponseWrapper cachingResponse = new ContentCachingResponseWrapper(response);

        long startTime = System.currentTimeMillis();

        filterChain.doFilter(cachingRequest, cachingResponse);

        logging(cachingRequest, cachingResponse, startTime);

        cachingResponse.copyBodyToResponse();
    }

    private void logging(ContentCachingRequestWrapper request, ContentCachingResponseWrapper response, long startTime) {
        HttpStatus httpStatus = HttpStatus.resolve(response.getStatus());
        String processingTime = String.format("%,.3f s", (System.currentTimeMillis() - startTime) * 0.001);

        if (httpStatus != null && !httpStatus.isError()) {
            log.info("[{}][{}][uid: {}][{} {}{}][status: {}][processing time: {}]", request.getRemoteAddr(), Util.getRequestId(request), Util.getUserId(request), request.getMethod(), request.getContextPath(), request.getServletPath(), httpStatus, processingTime);
        } else {
            try {
                ResponseDTO responseDTO = objectMapper.readValue(response.getContentAsByteArray(), ResponseDTO.class);
                String code = responseDTO.getData().getCode();

                if (withoutParameterProperties.isWithout(request.getMethod(), request.getServletPath())) {
                    loggingDefault(request, httpStatus, code, processingTime);
                } else {
                    String contentType = request.getContentType();

                    if (contentType != null) {
                        if (contentType.equals(MediaType.APPLICATION_JSON_VALUE)) {
                            JsonNode content = objectMapper.readTree(request.getContentAsByteArray());

                            log.error("[{}][{}][uid: {}][{} {}{}][content: {}][status: {}][code: {}][processing time: {}]", request.getRemoteAddr(), Util.getRequestId(request), Util.getUserId(request), request.getMethod(), request.getContextPath(), request.getServletPath(), content, httpStatus, code, processingTime);
                        } else {
                            log.error("[{}][{}][uid: {}][{} {}{}][content type: {}][status: {}][code: {}][processing time: {}]", request.getRemoteAddr(), Util.getRequestId(request), Util.getUserId(request), request.getMethod(), request.getContextPath(), request.getServletPath(), contentType, httpStatus, code, processingTime);
                        }
                    } else {
                        logging(request, httpStatus, code, processingTime);
                    }
                }
            } catch (IOException e) {
                CommonLogger.loggingDetail(request, e);
                logging(request, httpStatus, null, processingTime);
            }
        }
    }

    private void logging(ContentCachingRequestWrapper request, HttpStatus httpStatus, String code, String processingTime) {
        String query = request.getQueryString();

        if (query != null) {
            log.error("[{}][{}][uid: {}][{} {}{}?{}][status: {}][code: {}][processing time: {}]", request.getRemoteAddr(), Util.getRequestId(request), Util.getUserId(request), request.getMethod(), request.getContextPath(), request.getServletPath(), query, httpStatus, code, processingTime);
        } else {
            loggingDefault(request, httpStatus, code, processingTime);
        }
    }

    private void loggingDefault(ContentCachingRequestWrapper request, HttpStatus httpStatus, String code, String processingTime) {
        log.error("[{}][{}][uid: {}][{} {}{}][status: {}][code: {}][processing time: {}]", request.getRemoteAddr(), Util.getRequestId(request), Util.getUserId(request), request.getMethod(), request.getContextPath(), request.getServletPath(), httpStatus, code, processingTime);
    }

}
