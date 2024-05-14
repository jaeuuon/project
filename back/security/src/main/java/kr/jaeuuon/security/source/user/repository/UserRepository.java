package kr.jaeuuon.security.source.user.repository;

import kr.jaeuuon.common.jpa.source.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 사용자 레파지토리.
 */
public interface UserRepository extends JpaRepository<User, Long>, UserRepositoryCustom {

}
