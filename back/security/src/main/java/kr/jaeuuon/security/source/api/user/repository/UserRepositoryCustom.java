package kr.jaeuuon.security.source.api.user.repository;

import kr.jaeuuon.security.source.security.userdetails.impl.UserDetailsImpl;

import java.util.Optional;

public interface UserRepositoryCustom {

    Optional<UserDetailsImpl> customFindJoinAuthorityById(long id);

    Optional<UserDetailsImpl> customFindJoinAuthorityByEmail(String email);

}
