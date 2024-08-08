package kr.jaeuuon.security.source.api.user.controller;

import jakarta.servlet.http.HttpServletRequest;
import kr.jaeuuon.common.basic.source.code.impl.AuthorityCode;
import kr.jaeuuon.common.web.source.annotation.HasRole;
import kr.jaeuuon.common.web.source.util.ResponseSuccessUtil;
import kr.jaeuuon.security.source.api.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/list")
    @HasRole({AuthorityCode.ROLE_ADMIN})
    public ResponseEntity<Object> getList(HttpServletRequest request, Pageable pageable) {
        return ResponseSuccessUtil.ok(request, userService.getList(pageable));
    }

}
