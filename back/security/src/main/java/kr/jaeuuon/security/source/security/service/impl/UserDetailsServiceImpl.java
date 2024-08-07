package kr.jaeuuon.security.source.security.service.impl;

import kr.jaeuuon.security.source.api.user.service.UserService;
import kr.jaeuuon.security.source.security.userdetails.impl.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserService userService;

    @Override
    @Transactional(readOnly = true)
    public UserDetailsImpl loadUserByUsername(String email) {
        return userService.getJoinAuthority(email);
    }

}
