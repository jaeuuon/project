package kr.jaeuuon.security.source.security.service.impl;

import kr.jaeuuon.security.source.security.userdetails.impl.UserDetailsImpl;
import kr.jaeuuon.security.source.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * UserDetailsService 구현.
 */
@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserService userService;

    /**
     * loadUserByUsername 구현.
     */
    @Override
    @Transactional(readOnly = true)
    public UserDetailsImpl loadUserByUsername(String email) {
        return userService.getJoinAuthority(email);
    }

}
