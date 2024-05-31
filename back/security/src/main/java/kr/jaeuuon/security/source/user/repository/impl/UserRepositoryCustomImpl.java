package kr.jaeuuon.security.source.user.repository.impl;

import com.querydsl.core.group.GroupBy;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import kr.jaeuuon.common.jpa.source.code.impl.StatusCode;
import kr.jaeuuon.common.jpa.source.user.entity.QUser;
import kr.jaeuuon.common.jpa.source.user.entity.QUserAuthority;
import kr.jaeuuon.security.source.security.userdetails.impl.QUserDetailsImpl;
import kr.jaeuuon.security.source.security.userdetails.impl.QUserDetailsImpl_Authority;
import kr.jaeuuon.security.source.security.userdetails.impl.UserDetailsImpl;
import kr.jaeuuon.security.source.user.repository.UserRepositoryCustom;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Map;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class UserRepositoryCustomImpl implements UserRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Optional<UserDetailsImpl> customFindJoinAuthorityById(long id) {
        return customFindJoinAuthorityByIdOrEmail(id, null);
    }

    @Override
    public Optional<UserDetailsImpl> customFindJoinAuthorityByEmail(String email) {
        return customFindJoinAuthorityByIdOrEmail(null, email);
    }

    private Optional<UserDetailsImpl> customFindJoinAuthorityByIdOrEmail(Long id, String email) {
        QUser user = QUser.user;
        QUserAuthority userAuthority = QUserAuthority.userAuthority;

        Map<Long, UserDetailsImpl> result = jpaQueryFactory.from(user)
                .leftJoin(user.authorities, userAuthority).on(userAuthority.statusCode.eq(StatusCode.ACTIVATED))
                .where(equalsIdOrEmail(id, email))
                .transform(GroupBy.groupBy(user.id).as(new QUserDetailsImpl(user.id, user.password, user.name, GroupBy.set(new QUserDetailsImpl_Authority(userAuthority.authorityCode)), user.statusCode)));

        return result.values().stream().findAny();
    }

    private BooleanExpression equalsIdOrEmail(Long id, String email) {
        return id != null ? QUser.user.id.eq(id) : QUser.user.email.eq(email);
    }

}
