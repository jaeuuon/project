package kr.jaeuuon.security.source.security.provider.impl;

import kr.jaeuuon.common.basic.source.exception.CommonException;
import kr.jaeuuon.security.properties.SecurityProperties;
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

import java.security.GeneralSecurityException;

@Component
@RequiredArgsConstructor
public class AuthenticationProviderImpl implements AuthenticationProvider {

    private final UserDetailsServiceImpl userDetailsServiceImpl;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final SecurityProperties securityProperties;

    @Override
    public Authentication authenticate(Authentication authentication) {
        String email = authentication.getName();
        UserDetailsImpl userDetailsImpl = userDetailsServiceImpl.loadUserByUsername(email);

        if (userDetailsImpl == null) {
            throw new SecurityException(HttpStatus.UNAUTHORIZED, SecurityMessageImpl.ERROR_SCR_EMAIL_WRONG);
        }

        String credentials = authentication.getCredentials().toString();
        int credentialsLength = 0;

        try {
            credentials = securityProperties.decrypt(credentials);
            credentialsLength = credentials.length();

            if (credentialsLength < 4 || credentialsLength > 50) {
                throw new SecurityException(HttpStatus.UNAUTHORIZED, SecurityMessageImpl.ERROR_SCR_PASSWORD_DECRYPT_SIZE);
            }
        } catch (GeneralSecurityException e) {
            throw new CommonException(HttpStatus.INTERNAL_SERVER_ERROR, SecurityMessageImpl.ERROR_SCR_PASSWORD_DECRYPT);
        }

        if (!bCryptPasswordEncoder.matches(credentials, userDetailsImpl.getPassword())) {
            throw new SecurityException(HttpStatus.UNAUTHORIZED, SecurityMessageImpl.ERROR_SCR_PASSWORD_WRONG, userDetailsImpl, ResultCode.ERROR_PASSWORD);
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
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
    }

}
