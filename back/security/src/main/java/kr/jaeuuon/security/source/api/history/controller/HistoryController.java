package kr.jaeuuon.security.source.api.history.controller;

import jakarta.servlet.http.HttpServletRequest;
import kr.jaeuuon.common.basic.source.code.impl.AuthorityCode;
import kr.jaeuuon.common.basic.source.constant.CommonConstant;
import kr.jaeuuon.common.web.source.annotation.HasRole;
import kr.jaeuuon.common.web.source.util.ResponseSuccessUtil;
import kr.jaeuuon.security.source.api.history.service.HistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/history")
@RequiredArgsConstructor
public class HistoryController {

    private final HistoryService historyService;

    @GetMapping("/login/list")
    public ResponseEntity<Object> getLoginList(HttpServletRequest request, @RequestHeader(CommonConstant.HEADER_USER_ID) long userId, Pageable pageable) {
        return ResponseSuccessUtil.ok(request, historyService.getLoginList(userId, pageable, false));
    }

    @GetMapping("/{userId}/login/list")
    @HasRole({AuthorityCode.ROLE_ADMIN})
    public ResponseEntity<Object> getLoginListByUserId(HttpServletRequest request, @PathVariable long userId, Pageable pageable) {
        return ResponseSuccessUtil.ok(request, historyService.getLoginList(userId, pageable, true));
    }

}
