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

/**
 * 사용자 로그인 기록 조회 컨트롤러.
 */
@RestController
@RequestMapping("/history")
@RequiredArgsConstructor
public class HistoryController {

    private final HistoryService historyService;

    /**
     * 사용자 로그인 기록 조회(본인).
     */
    @GetMapping("/list")
    public ResponseEntity<Object> getList(HttpServletRequest request, @RequestHeader(CommonConstant.HEADER_USER_ID) long userId, Pageable pageable) {
        return ResponseSuccessUtil.ok(request, historyService.getList(userId, pageable, false));
    }

    /**
     * 사용자 로그인 기록 조회(특정 사용자).
     */
    @GetMapping("/{userId}/list")
    @HasRole({AuthorityCode.ROLE_ADMIN})
    public ResponseEntity<Object> getListByUserId(HttpServletRequest request, @PathVariable long userId, Pageable pageable) {
        return ResponseSuccessUtil.ok(request, historyService.getList(userId, pageable, true));
    }

}
