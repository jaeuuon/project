package kr.jaeuuon.security.source.api.user.service;

import kr.jaeuuon.common.jpa.source.entity.user.User;
import kr.jaeuuon.security.source.api.user.repository.UserRepository;
import kr.jaeuuon.security.source.security.userdetails.impl.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public User get(long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Transactional(readOnly = true)
    public UserDetailsImpl getJoinAuthority(long id) {
        return userRepository.customFindJoinAuthorityById(id).orElse(null);
    }

    @Transactional(readOnly = true)
    public UserDetailsImpl getJoinAuthority(String email) {
        return userRepository.customFindJoinAuthorityByEmail(email).orElse(null);
    }

}
