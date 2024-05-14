package kr.jaeuuon.security.source.user.service;

import kr.jaeuuon.common.jpa.source.user.entity.User;
import kr.jaeuuon.security.source.security.userdetails.impl.UserDetailsImpl;
import kr.jaeuuon.security.source.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 사용자 조회 서비스.
 */
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    /**
     * 아이디 조회.
     */
    @Transactional(readOnly = true)
    public User get(long id) {
        return userRepository.findById(id).orElse(null);
    }

    /**
     * 아이디 조회.
     */
    @Transactional(readOnly = true)
    public UserDetailsImpl getJoinAuthority(long id) {
        return userRepository.customFindJoinAuthorityById(id).orElse(null);
    }

    /**
     * 이메일 조회.
     */
    @Transactional(readOnly = true)
    public UserDetailsImpl getJoinAuthority(String email) {
        return userRepository.customFindJoinAuthorityByEmail(email).orElse(null);
    }

}
