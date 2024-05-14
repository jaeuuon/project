package kr.jaeuuon.security.source.api.authentication.service;

import kr.jaeuuon.common.basic.source.code.impl.AuthorityCode;
import kr.jaeuuon.common.jwt.source.provider.JwtProvider;
import kr.jaeuuon.common.web.source.annotation.PublishEvent;
import kr.jaeuuon.security.source.api.authentication.dto.AuthenticationDTO;
import kr.jaeuuon.security.source.api.authentication.event.AuthenticationEvent;
import kr.jaeuuon.security.source.api.authentication.exception.AuthenticationException;
import kr.jaeuuon.security.source.jwt.dto.JwtDTO;
import kr.jaeuuon.security.source.jwt.entity.Jwt;
import kr.jaeuuon.security.source.jwt.service.JwtService;
import kr.jaeuuon.security.source.message.enumeration.impl.SecurityMessageImpl;
import kr.jaeuuon.security.source.security.userdetails.impl.UserDetailsImpl;
import kr.jaeuuon.security.source.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.stream.Collectors;

/**
 * 로그인/재발급/로그아웃 서비스.
 */
@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    private final JwtService jwtService;
    private final UserService userService;

    private final JwtProvider jwtProvider;

    /**
     * 사용자 리턴.
     */
    @PublishEvent(event = AuthenticationEvent.class, isThrowing = true)
    public UserDetailsImpl getUserDetailsImpl(AuthenticationDTO authenticationDTO) {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(authenticationDTO.getEmail(), authenticationDTO.getPassword());
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(usernamePasswordAuthenticationToken);

        return (UserDetailsImpl) authentication.getPrincipal();
    }

    /**
     * JWT 생성 및 리턴.
     */
    public JwtDTO createJwt(UserDetailsImpl userDetailsImpl) {
        String jwtAccess = jwtProvider.createAccess(userDetailsImpl.getId(), userDetailsImpl.getName(), getAuthorities(userDetailsImpl), getAuthorityValues(userDetailsImpl));
        String jwtRefresh = jwtProvider.createRefresh();

        jwtService.add(userDetailsImpl.getId(), jwtRefresh);

        return new JwtDTO(jwtAccess, jwtRefresh);
    }

    /**
     * JWT를 새로 생성 및 리턴.
     */
    public JwtDTO reissuance(String requestIp, String requestId, long userId, JwtDTO jwtDTO) throws AuthenticationException {
        jwtProvider.getClaims(requestIp, requestId, jwtDTO.getRefresh(), true);

        Jwt jwt = jwtService.get(userId).orElseThrow(() -> new AuthenticationException(HttpStatus.UNAUTHORIZED, SecurityMessageImpl.ERROR_SECU_JWT_002));

        if (!jwtDTO.getRefresh().equals(jwt.getRefresh())) {
            throw new AuthenticationException(HttpStatus.UNAUTHORIZED, SecurityMessageImpl.ERROR_SECU_JWT_003);
        }

        UserDetailsImpl userDetailsImpl = userService.getJoinAuthority(userId);

        if (userDetailsImpl == null) {
            throw new AuthenticationException(HttpStatus.UNAUTHORIZED, SecurityMessageImpl.ERROR_SECU_002);
        } else if (!userDetailsImpl.isEnabled()) {
            throw new AuthenticationException(HttpStatus.UNAUTHORIZED, SecurityMessageImpl.ERROR_SECU_001);
        } else if (ObjectUtils.isEmpty(userDetailsImpl.getAuthorities())) {
            throw new AuthenticationException(HttpStatus.UNAUTHORIZED, SecurityMessageImpl.ERROR_SECU_AUTH_001);
        }

        return createJwt(userDetailsImpl);
    }

    private String getAuthorities(UserDetailsImpl userDetailsImpl) {
        return userDetailsImpl.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(","));
    }

    private String getAuthorityValues(UserDetailsImpl userDetailsImpl) {
        return userDetailsImpl.getAuthorities().stream().map(GrantedAuthority::getAuthority).map(AuthorityCode::findByStringCode).map(AuthorityCode::getValue).collect(Collectors.joining(","));
    }

    /**
     * JWT(Refresh) 삭제.
     */
    public void logout(long userId) throws AuthenticationException {
        if (!jwtService.remove(userId)) {
            throw new AuthenticationException(HttpStatus.INTERNAL_SERVER_ERROR, SecurityMessageImpl.ERROR_SECU_003);
        }
    }

}
