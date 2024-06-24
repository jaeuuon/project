package kr.jaeuuon.security.source.api.authentication.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import kr.jaeuuon.common.basic.source.code.impl.AuthorityCode;
import kr.jaeuuon.common.basic.source.exception.CommonException;
import kr.jaeuuon.common.basic.source.message.enumeration.impl.MessageImpl;
import kr.jaeuuon.common.jwt.properties.JwtProperties;
import kr.jaeuuon.common.jwt.source.message.enumeration.impl.JwtMessageImpl;
import kr.jaeuuon.common.jwt.source.provider.JwtProvider;
import kr.jaeuuon.common.web.source.annotation.PublishEvent;
import kr.jaeuuon.security.source.api.authentication.dto.AuthenticationDTO;
import kr.jaeuuon.security.source.api.authentication.event.AuthenticationEvent;
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

import java.util.Date;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    private final JwtService jwtService;
    private final UserService userService;

    private final JwtProvider jwtProvider;

    private final JwtProperties jwtProperties;

    @PublishEvent(event = AuthenticationEvent.class, isThrowing = true)
    public UserDetailsImpl getUserDetailsImpl(AuthenticationDTO authenticationDTO) {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(authenticationDTO.getEmail(), authenticationDTO.getPassword());
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(usernamePasswordAuthenticationToken);

        return (UserDetailsImpl) authentication.getPrincipal();
    }

    public JwtDTO createJwt(UserDetailsImpl userDetailsImpl) throws JsonProcessingException {
        String authorities = userDetailsImpl.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(","));
        String authorityValues = userDetailsImpl.getAuthorities().stream().map(GrantedAuthority::getAuthority).map(AuthorityCode::findByStringCode).map(AuthorityCode::getValue).collect(Collectors.joining(","));

        Date expiration = new Date(System.currentTimeMillis() + (jwtProperties.getExpirationMinutes() * 60 * 1000));

        String jwtAccess = jwtProvider.createAccess(userDetailsImpl.getId(), userDetailsImpl.getEmail(), userDetailsImpl.getName(), authorities, authorityValues, expiration);
        String jwtRefresh = jwtProvider.createRefresh(expiration);

        jwtService.add(userDetailsImpl.getId(), jwtRefresh);

        return new JwtDTO(jwtAccess, jwtRefresh);
    }

    public JwtDTO reissuance(long userId, String refresh) throws JsonProcessingException {
        jwtProvider.getClaims(refresh);

        Jwt jwt = jwtService.get(userId).orElseThrow(() -> new CommonException(HttpStatus.UNAUTHORIZED, JwtMessageImpl.ERROR_JWT_EXPIRED));

        if (!jwt.getRefresh().equals(refresh)) {
            throw new CommonException(HttpStatus.UNAUTHORIZED, SecurityMessageImpl.ERROR_SCR_JWT_REFRESH_ALREADY);
        }

        UserDetailsImpl userDetailsImpl = userService.getJoinAuthority(userId);

        if (userDetailsImpl == null) {
            throw new CommonException(HttpStatus.UNAUTHORIZED, MessageImpl.ERROR_BSC_USER_NOT_FOUND);
        } else if (!userDetailsImpl.isEnabled()) {
            throw new CommonException(HttpStatus.UNAUTHORIZED, SecurityMessageImpl.ERROR_SCR_NOT_ACTIVATED);
        } else if (ObjectUtils.isEmpty(userDetailsImpl.getAuthorities())) {
            throw new CommonException(HttpStatus.UNAUTHORIZED, MessageImpl.ERROR_BSC_FORBIDDEN);
        }

        return createJwt(userDetailsImpl);
    }

    public void logout(long userId) {
        if (!jwtService.remove(userId)) {
            throw new CommonException(HttpStatus.INTERNAL_SERVER_ERROR, SecurityMessageImpl.ERROR_SCR_LOGOUT);
        }
    }

}
