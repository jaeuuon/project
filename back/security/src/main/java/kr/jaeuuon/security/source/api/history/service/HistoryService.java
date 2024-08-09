package kr.jaeuuon.security.source.api.history.service;

import kr.jaeuuon.security.source.api.history.code.impl.ResultCode;
import kr.jaeuuon.security.source.api.history.dto.HistoryDTO;
import kr.jaeuuon.security.source.api.history.entity.History;
import kr.jaeuuon.security.source.api.history.repository.HistoryRepository;
import kr.jaeuuon.security.source.api.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class HistoryService {

    private final UserService userService;

    private final HistoryRepository historyRepository;

    @Transactional
    public void add(String requestIp, String requestId, long userId, ResultCode resultCode) {
        historyRepository.save(new History(requestIp, requestId, userId, resultCode));
    }

    @Transactional(readOnly = true)
    public Page<HistoryDTO> getLoginList(long userId, Pageable pageable, boolean isAdmin) {
        userService.getDetail(userId);

        return historyRepository.customFindByUserId(userId, pageable, isAdmin);
    }

}
