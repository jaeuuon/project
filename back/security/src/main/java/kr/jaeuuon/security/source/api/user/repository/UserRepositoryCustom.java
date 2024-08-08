package kr.jaeuuon.security.source.api.user.repository;

import kr.jaeuuon.security.source.api.user.dto.UserDTO;
import kr.jaeuuon.security.source.security.userdetails.impl.UserDetailsImpl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface UserRepositoryCustom {

    Optional<UserDetailsImpl> customFindJoinAuthorityById(long id);

    Optional<UserDetailsImpl> customFindJoinAuthorityByEmail(String email);

    Page<UserDTO> customFindAll(Pageable pageable);

}
