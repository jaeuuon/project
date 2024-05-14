package kr.jaeuuon.security.source.jwt.authentication;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kr.jaeuuon.common.basic.source.logger.CommonLogger;
import kr.jaeuuon.common.basic.source.util.Util;
import kr.jaeuuon.common.web.source.util.ResponseErrorUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * Security 오류 처리.
 */
@Component
@RequiredArgsConstructor
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final ResponseErrorUtil responseErrorUtil;

    /**
     * 유효한 인증 자격 증명이 없음(401) 오류 처리.
     */
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        CommonLogger.error(request.getRemoteAddr(), Util.getRequestId(request), Util.getCallerClassAndMethodName(), authException.getClass().getSimpleName(), authException.getMessage());

        responseErrorUtil.unauthorized(request, response);
    }

}
