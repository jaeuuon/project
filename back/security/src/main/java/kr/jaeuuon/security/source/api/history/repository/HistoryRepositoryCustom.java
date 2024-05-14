package kr.jaeuuon.security.source.api.history.repository;

import kr.jaeuuon.security.source.api.history.dto.HistoryDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * 사용자 인증 기록 레파지토리(Querydsl).
 */
public interface HistoryRepositoryCustom {

    /**
     * 사용자 인증 기록 조회.
     */
    Page<HistoryDTO> customFindByUserId(long userId, Pageable pageable, boolean isAdmin);

}
