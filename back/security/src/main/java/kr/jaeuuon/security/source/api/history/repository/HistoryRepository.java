package kr.jaeuuon.security.source.api.history.repository;

import kr.jaeuuon.security.source.api.history.entity.History;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 사용자 인증 기록 레파지토리.
 */
public interface HistoryRepository extends JpaRepository<History, Long>, HistoryRepositoryCustom {

}
