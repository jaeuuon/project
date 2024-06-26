package kr.jaeuuon.security.source.api.authentication.event;

import jakarta.servlet.http.HttpServletRequest;
import kr.jaeuuon.common.basic.source.util.Util;
import kr.jaeuuon.common.web.source.event.CommonEvent;
import kr.jaeuuon.security.source.api.history.code.impl.ResultCode;
import kr.jaeuuon.security.source.security.exception.SecurityException;
import kr.jaeuuon.security.source.security.userdetails.impl.UserDetailsImpl;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AuthenticationEvent implements CommonEvent<UserDetailsImpl> {

    private String requestIp;
    private String requestId;

    private UserDetailsImpl value;
    private ResultCode resultCode;

    private boolean isThrowing;

    public AuthenticationEvent(UserDetailsImpl userDetailsImpl) {
        HttpServletRequest request = Util.getRequest();

        if (request != null) {
            requestIp = request.getRemoteAddr();
            requestId = Util.getRequestId(request);
        }

        value = userDetailsImpl;
        resultCode = ResultCode.SUCCESS;
    }

    public AuthenticationEvent(SecurityException securityException) {
        HttpServletRequest request = Util.getRequest();

        if (request != null) {
            requestIp = request.getRemoteAddr();
            requestId = Util.getRequestId(request);
        }

        value = securityException.getUserDetailsImpl();
        resultCode = securityException.getResultCode();

        isThrowing = true;
    }

}
