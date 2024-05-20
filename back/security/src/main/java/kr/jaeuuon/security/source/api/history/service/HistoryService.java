package kr.jaeuuon.security.source.api.history.service;

import kr.jaeuuon.security.source.api.history.code.impl.ResultCode;
import kr.jaeuuon.security.source.api.history.dto.HistoryDTO;
import kr.jaeuuon.security.source.api.history.entity.History;
import kr.jaeuuon.security.source.api.history.exception.HistoryException;
import kr.jaeuuon.security.source.api.history.repository.HistoryRepository;
import kr.jaeuuon.security.source.message.enumeration.impl.SecurityMessageImpl;
import kr.jaeuuon.security.source.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 사용자 인증 기록 서비스.
 */
@Service
@RequiredArgsConstructor
public class HistoryService {

    private final UserService userService;

    private final HistoryRepository historyRepository;

    /**
     * 사용자 인증 기록 저장.
     */
    @Transactional
    public void add(String requestIp, String requestId, long userId, ResultCode resultCode) {
        historyRepository.save(new History(requestIp, requestId, userId, resultCode));
    }

    /**
     * 사용자 인증 기록 조회.
     */
    @Transactional(readOnly = true)
    public Page<HistoryDTO> getList(long userId, Pageable pageable, boolean isAdmin) {
        if (userService.get(userId) == null) {
            throw new HistoryException(HttpStatus.BAD_REQUEST, SecurityMessageImpl.ERROR_SECU_002);
        }

        return historyRepository.customFindByUserId(userId, pageable, isAdmin);
    }

}