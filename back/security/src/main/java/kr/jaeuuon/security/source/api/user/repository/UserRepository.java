package kr.jaeuuon.security.source.api.user.repository;

import kr.jaeuuon.common.jpa.source.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long>, UserRepositoryCustom {

}
