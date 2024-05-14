package kr.jaeuuon.security.source.user.repository.impl;

import com.querydsl.core.group.GroupBy;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import kr.jaeuuon.common.jpa.source.user.entity.QUser;
import kr.jaeuuon.common.jpa.source.user.entity.QUserAuthority;
import kr.jaeuuon.common.jpa.source.util.QuerydslUtil;
import kr.jaeuuon.security.source.security.userdetails.impl.QUserDetailsImpl;
import kr.jaeuuon.security.source.security.userdetails.impl.QUserDetailsImpl_Authority;
import kr.jaeuuon.security.source.security.userdetails.impl.UserDetailsImpl;
import kr.jaeuuon.security.source.user.repository.UserRepositoryCustom;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Map;
import java.util.Optional;

/**
 * 사용자 레파지토리(Querydsl) 구현.
 */
@Repository
@RequiredArgsConstructor
public class UserRepositoryCustomImpl implements UserRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    /**
     * 아이디 조회 구현.
     */
    @Override
    public Optional<UserDetailsImpl> customFindJoinAuthorityById(long id) {
        return customFindJoinAuthorityByIdOrEmail(id, null);
    }

    /**
     * 이메일 조회 구현.
     */
    @Override
    public Optional<UserDetailsImpl> customFindJoinAuthorityByEmail(String email) {
        return customFindJoinAuthorityByIdOrEmail(null, email);
    }

    /**
     * 아이디 또는 이메일 조회 구현.
     */
    private Optional<UserDetailsImpl> customFindJoinAuthorityByIdOrEmail(Long id, String email) {
        QUser user = QUser.user;
        QUserAuthority userAuthority = QUserAuthority.userAuthority;

        Map<Long, UserDetailsImpl> result = jpaQueryFactory.from(user)
                .leftJoin(user.authorities, userAuthority).on(QuerydslUtil.equalsStatusCodeActivated(userAuthority.statusCode))
                .where(equalsIdOrEmail(id, email))
                .transform(GroupBy.groupBy(user.id).as(new QUserDetailsImpl(user.id, user.password, user.name, GroupBy.set(new QUserDetailsImpl_Authority(userAuthority.authorityCode)), user.statusCode)));

        return result.values().stream().findAny();
    }

    /**
     * 아이디 또는 이메일 조건.
     */
    private BooleanExpression equalsIdOrEmail(Long id, String email) {
        return id != null ? QUser.user.id.eq(id) : QUser.user.email.eq(email);
    }

}
