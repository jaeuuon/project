package kr.jaeuuon.security.source.api.history.repository;

import kr.jaeuuon.security.source.api.history.entity.History;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistoryRepository extends JpaRepository<History, Long>, HistoryRepositoryCustom {

}
