package kr.jaeuuon.security.source.security.provider.impl;

import kr.jaeuuon.security.source.api.history.code.impl.ResultCode;
import kr.jaeuuon.security.source.message.enumeration.impl.SecurityMessageImpl;
import kr.jaeuuon.security.source.security.exception.SecurityException;
import kr.jaeuuon.security.source.security.service.impl.UserDetailsServiceImpl;
import kr.jaeuuon.security.source.security.userdetails.impl.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;

/**
 * AuthenticationProvider 구현.
 */
@Component
@RequiredArgsConstructor
public class AuthenticationProviderImpl implements AuthenticationProvider {

    private final UserDetailsServiceImpl userDetailsServiceImpl;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    /**
     * 사용자 인증 구현.
     */
    @Override
    public Authentication authenticate(Authentication authentication) {
        String email = authentication.getName();
        UserDetailsImpl userDetailsImpl = userDetailsServiceImpl.loadUserByUsername(email);

        if (userDetailsImpl == null) {
            throw new SecurityException(HttpStatus.UNAUTHORIZED, SecurityMessageImpl.ERROR_SCR_EMAIL);
        }

        String credentials = authentication.getCredentials().toString();

        if (!bCryptPasswordEncoder.matches(credentials, userDetailsImpl.getPassword())) {
            throw new SecurityException(HttpStatus.UNAUTHORIZED, SecurityMessageImpl.ERROR_SCR_PASSWORD, userDetailsImpl, ResultCode.ERROR_PASSWORD);
        }

        if (!userDetailsImpl.isEnabled()) {
            throw new SecurityException(HttpStatus.UNAUTHORIZED, userDetailsImpl, ResultCode.ERROR_DEACTIVATE);
        } else if (ObjectUtils.isEmpty(userDetailsImpl.getAuthorities())) {
            throw new SecurityException(HttpStatus.FORBIDDEN, userDetailsImpl, ResultCode.ERROR_AUTHORITIES);
        }

        return new UsernamePasswordAuthenticationToken(userDetailsImpl, null, userDetailsImpl.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
    }

}
