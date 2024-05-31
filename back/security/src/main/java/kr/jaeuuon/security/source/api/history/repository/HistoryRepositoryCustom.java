package kr.jaeuuon.security.source.api.history.repository;

import kr.jaeuuon.security.source.api.history.dto.HistoryDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface HistoryRepositoryCustom {

    Page<HistoryDTO> customFindByUserId(long userId, Pageable pageable, boolean isAdmin);

}
