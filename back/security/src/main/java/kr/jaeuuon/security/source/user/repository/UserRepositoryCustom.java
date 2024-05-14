package kr.jaeuuon.security.source.user.repository;

import kr.jaeuuon.security.source.security.userdetails.impl.UserDetailsImpl;

import java.util.Optional;

/**
 * 사용자 레파지토리(Querydsl).
 */
public interface UserRepositoryCustom {

    /**
     * 아이디 조회.
     */
    Optional<UserDetailsImpl> customFindJoinAuthorityById(long id);

    /**
     * 이메일 조회.
     */
    Optional<UserDetailsImpl> customFindJoinAuthorityByEmail(String email);

}
