package kr.jaeuuon.common.web.source.aspect;

import jakarta.servlet.http.HttpServletRequest;
import kr.jaeuuon.common.basic.source.code.impl.AuthorityCode;
import kr.jaeuuon.common.basic.source.exception.CommonException;
import kr.jaeuuon.common.basic.source.util.Util;
import kr.jaeuuon.common.web.source.annotation.HasRole;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * 역할 체크 AOP.
 */
@Aspect
@Component
@RequiredArgsConstructor
public class HasRoleAspect {

    /**
     * Pointcut(역할 체크 어노테이션).
     */
    @Pointcut("@annotation(hasRole)")
    public void hasRole(HasRole hasRole) {
    }

    /**
     * Before(역할 체크 어노테이션).
     */
    @Before("hasRole(hasRole)")
    public void beforeHasRole(HasRole hasRole) throws CommonException {
        HttpServletRequest request = Util.getRequest();

        if (request == null) {
            throw new CommonException(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        Set<AuthorityCode> userRoles = getUserRoles(request);
        Set<AuthorityCode> targetRoles = new HashSet<>(Arrays.asList(hasRole.value()));

        userRoles.retainAll(targetRoles);

        if (userRoles.isEmpty()) {
            throw new CommonException(HttpStatus.FORBIDDEN);
        }
    }

    /**
     * 헤더의 사용자 권한에서 역할 리턴(User-Authorities).
     */
    private Set<AuthorityCode> getUserRoles(HttpServletRequest request) {
        Set<AuthorityCode> authorities = Util.getUserAuthorities(request);

        return authorities.stream().filter(authority -> authority.name().startsWith("ROLE_")).collect(Collectors.toSet());
    }

}
