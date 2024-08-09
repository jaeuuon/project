package kr.jaeuuon.security.source.api.user.controller;

import jakarta.servlet.http.HttpServletRequest;
import kr.jaeuuon.common.basic.source.code.impl.AuthorityCode;
import kr.jaeuuon.common.basic.source.constant.CommonConstant;
import kr.jaeuuon.common.basic.source.exception.CommonException;
import kr.jaeuuon.common.basic.source.util.Util;
import kr.jaeuuon.common.web.source.annotation.HasRole;
import kr.jaeuuon.common.web.source.util.ResponseSuccessUtil;
import kr.jaeuuon.security.source.api.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<Object> getDetail(HttpServletRequest request, @RequestHeader(CommonConstant.HEADER_USER_ID) long loginUserId, @PathVariable long id) {
        Set<AuthorityCode> roles = Util.getUserRoles(request);

        if (!roles.contains(AuthorityCode.ROLE_ADMIN) || loginUserId != id) {
            throw new CommonException(HttpStatus.FORBIDDEN);
        }

        return ResponseSuccessUtil.ok(request, userService.getDetail(id));
    }

    @GetMapping("/list")
    @HasRole({AuthorityCode.ROLE_ADMIN})
    public ResponseEntity<Object> getList(HttpServletRequest request, Pageable pageable) {
        return ResponseSuccessUtil.ok(request, userService.getList(pageable));
    }

}
