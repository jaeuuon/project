package kr.jaeuuon.security.source.api.history.repository.impl;

import com.querydsl.core.types.Expression;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import kr.jaeuuon.common.jpa.source.repository.impl.AbstractBaseRepositoryCustomImpl;
import kr.jaeuuon.security.source.api.history.dto.HistoryDTO;
import kr.jaeuuon.security.source.api.history.dto.QHistoryDTO;
import kr.jaeuuon.security.source.api.history.entity.QHistory;
import kr.jaeuuon.security.source.api.history.repository.HistoryRepositoryCustom;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

/**
 * 사용자 인증 기록 레파지토리(Querydsl) 구현.
 */
@Repository
@RequiredArgsConstructor
public class HistoryRepositoryCustomImpl extends AbstractBaseRepositoryCustomImpl implements HistoryRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    /**
     * 사용자 인증 기록 조회 구현.
     */
    @Override
    public Page<HistoryDTO> customFindByUserId(long userId, Pageable pageable, boolean isAdmin) {
        QHistory history = QHistory.history;

        JPQLQuery<HistoryDTO> query = jpaQueryFactory.select(isAdmin ? new QHistoryDTO(history.requestIp, history.user.id, history.resultCode, history.createdTime) : new QHistoryDTO(history.requestIp, history.resultCode, history.createdTime)).from(history)
                .where(equalsUserId(userId))
                .orderBy(getOrders(pageable.getSort())).offset(pageable.getOffset()).limit(pageable.getPageSize());

        return PageableExecutionUtils.getPage(query.fetch(), pageable, query::fetchCount);
    }

    /**
     * 사용자 아이디 조건.
     */
    private BooleanExpression equalsUserId(long userId) {
        return QHistory.history.user.id.eq(userId);
    }

    /**
     * 정렬 프로퍼티에 대한 컬럼 리턴 구현.
     */
    @Override
    protected Expression<? extends Comparable<?>> getExpression(String property) {
        return CREATED_TIME.equals(property) ? QHistory.history.createdTime : null;
    }

}
