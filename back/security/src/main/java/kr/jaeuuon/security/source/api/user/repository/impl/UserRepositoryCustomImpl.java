package kr.jaeuuon.security.source.api.user.repository.impl;

import com.querydsl.core.group.GroupBy;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import kr.jaeuuon.common.jpa.source.code.impl.StatusCode;
import kr.jaeuuon.common.jpa.source.entity.user.QUser;
import kr.jaeuuon.common.jpa.source.entity.user.QUserAuthority;
import kr.jaeuuon.common.jpa.source.repository.impl.AbstractBaseRepositoryCustomImpl;
import kr.jaeuuon.security.source.api.user.dto.QUserDTO;
import kr.jaeuuon.security.source.api.user.dto.UserDTO;
import kr.jaeuuon.security.source.api.user.repository.UserRepositoryCustom;
import kr.jaeuuon.security.source.security.userdetails.impl.QUserDetailsImpl;
import kr.jaeuuon.security.source.security.userdetails.impl.QUserDetailsImpl_Authority;
import kr.jaeuuon.security.source.security.userdetails.impl.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import java.util.Map;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class UserRepositoryCustomImpl extends AbstractBaseRepositoryCustomImpl implements UserRepositoryCustom {

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
                .transform(GroupBy.groupBy(user.id).as(new QUserDetailsImpl(user.id, user.email, user.password, user.name, GroupBy.set(new QUserDetailsImpl_Authority(userAuthority.authorityCode)), user.statusCode)));

        return result.values().stream().findAny();
    }

    private BooleanExpression equalsIdOrEmail(Long id, String email) {
        return id != null ? QUser.user.id.eq(id) : QUser.user.email.eq(email);
    }

    @Override
    public Page<UserDTO> customFindAll(Pageable pageable) {
        QUser user = QUser.user;

        JPQLQuery<UserDTO> query = jpaQueryFactory.select(new QUserDTO(user.id, user.email, user.name)).from(user)
                .orderBy(getOrders(pageable.getSort())).offset(pageable.getOffset()).limit(pageable.getPageSize());

        return PageableExecutionUtils.getPage(query.fetch(), pageable, query::fetchCount);
    }

    @Override
    protected Expression<? extends Comparable<?>> getExpression(String property) {
        return CREATED_TIME.equals(property) ? QUser.user.createdTime : null;
    }

}
