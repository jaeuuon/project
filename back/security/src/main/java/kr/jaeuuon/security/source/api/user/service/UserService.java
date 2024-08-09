package kr.jaeuuon.security.source.api.user.service;

import kr.jaeuuon.common.basic.source.exception.CommonException;
import kr.jaeuuon.common.basic.source.message.enumeration.impl.MessageImpl;
import kr.jaeuuon.security.source.api.user.dto.UserDTO;
import kr.jaeuuon.security.source.api.user.repository.UserRepository;
import kr.jaeuuon.security.source.security.userdetails.impl.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public UserDetailsImpl getJoinAuthority(long id) {
        return userRepository.customFindJoinAuthorityById(id).orElse(null);
    }

    @Transactional(readOnly = true)
    public UserDetailsImpl getJoinAuthority(String email) {
        return userRepository.customFindJoinAuthorityByEmail(email).orElse(null);
    }

    @Transactional(readOnly = true)
    public UserDTO getDetail(long id) {
        return userRepository.findById(id).map(UserDTO::new).orElseThrow(() -> new CommonException(HttpStatus.BAD_REQUEST, MessageImpl.ERROR_BSC_USER_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public Page<UserDTO> getList(Pageable pageable) {
        return userRepository.customFindAll(pageable);
    }

}
