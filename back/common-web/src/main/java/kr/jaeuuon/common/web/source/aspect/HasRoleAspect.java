package kr.jaeuuon.common.web.source.aspect;

import jakarta.servlet.http.HttpServletRequest;
import kr.jaeuuon.common.basic.source.code.impl.AuthorityCode;
import kr.jaeuuon.common.basic.source.util.Util;
import kr.jaeuuon.common.web.source.annotation.HasRole;
import kr.jaeuuon.common.web.source.exception.HasRoleException;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

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
    public void beforeHasRole(HasRole hasRole) throws HasRoleException {
        HttpServletRequest request = Util.getRequest();

        if (request == null) {
            throw new HasRoleException();
        }

        Set<AuthorityCode> userRoles = Util.getUserRoles(request);
        Set<AuthorityCode> targetRoles = new HashSet<>(Arrays.asList(hasRole.value()));

        userRoles.retainAll(targetRoles);

        if (userRoles.isEmpty()) {
            throw new HasRoleException(HttpStatus.FORBIDDEN);
        }
    }

}
