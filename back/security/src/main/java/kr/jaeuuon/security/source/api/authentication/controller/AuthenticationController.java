package kr.jaeuuon.security.source.api.authentication.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import kr.jaeuuon.common.basic.source.constant.CommonConstant;
import kr.jaeuuon.common.jwt.source.constant.JwtConstant;
import kr.jaeuuon.common.web.source.util.ResponseSuccessUtil;
import kr.jaeuuon.security.source.api.authentication.dto.AuthenticationDTO;
import kr.jaeuuon.security.source.api.authentication.service.AuthenticationService;
import kr.jaeuuon.security.source.jwt.dto.JwtDTO;
import kr.jaeuuon.security.source.message.enumeration.impl.SecurityMessageImpl;
import kr.jaeuuon.security.source.security.userdetails.impl.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/authentication")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping
    public ResponseEntity<Object> login(HttpServletRequest request, @RequestBody @Valid AuthenticationDTO authenticationDTO) throws JsonProcessingException {
        UserDetailsImpl userDetailsImpl = authenticationService.getUserDetailsImpl(authenticationDTO);
        JwtDTO jwtDTO = authenticationService.createJwt(userDetailsImpl);
        HttpHeaders httpHeaders = setHttpHeader(jwtDTO.getAccess());

        return ResponseSuccessUtil.ok(request, httpHeaders, SecurityMessageImpl.SUCCESS_SCR_LOGIN, jwtDTO);
    }

    @PutMapping
    public ResponseEntity<Object> reissuance(HttpServletRequest request, @RequestHeader(CommonConstant.HEADER_USER_ID) long userId, @RequestBody @Valid JwtDTO jwtDTO) throws JsonProcessingException {
        jwtDTO = authenticationService.reissuance(userId, jwtDTO);
        HttpHeaders httpHeaders = setHttpHeader(jwtDTO.getAccess());

        return ResponseSuccessUtil.ok(request, httpHeaders, SecurityMessageImpl.SUCCESS_SCR_REISSUANCE, jwtDTO);
    }

    @DeleteMapping
    public ResponseEntity<Object> logout(HttpServletRequest request, @RequestHeader(CommonConstant.HEADER_USER_ID) long userId) {
        authenticationService.logout(userId);

        return ResponseSuccessUtil.ok(request, SecurityMessageImpl.SUCCESS_SCR_LOGOUT);
    }

    private HttpHeaders setHttpHeader(String jwtAccess) {
        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.add(JwtConstant.HEADER_AUTHORIZATION, JwtConstant.HEADER_AUTHORIZATION_GRANT_TYPE + jwtAccess);

        return httpHeaders;
    }

}
