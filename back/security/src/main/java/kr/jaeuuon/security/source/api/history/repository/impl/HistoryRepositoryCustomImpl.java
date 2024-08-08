package kr.jaeuuon.security.source.api.history.repository.impl;

import com.querydsl.core.types.ConstructorExpression;
import com.querydsl.core.types.Expression;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import kr.jaeuuon.common.jpa.source.repository.impl.AbstractBaseRepositoryCustomImpl;
import kr.jaeuuon.security.source.api.history.dto.HistoryDTO;
import kr.jaeuuon.security.source.api.history.dto.QHistoryDTO;
import kr.jaeuuon.security.source.api.history.dto.QHistoryResultDTO;
import kr.jaeuuon.security.source.api.history.entity.QHistory;
import kr.jaeuuon.security.source.api.history.repository.HistoryRepositoryCustom;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class HistoryRepositoryCustomImpl extends AbstractBaseRepositoryCustomImpl implements HistoryRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Page<HistoryDTO> customFindByUserId(long userId, Pageable pageable, boolean isAdmin) {
        QHistory history = QHistory.history;

        JPQLQuery<HistoryDTO> query = jpaQueryFactory.select(getExpr(history, isAdmin)).from(history)
                .where(QHistory.history.user.id.eq(userId))
                .orderBy(getOrders(pageable.getSort())).offset(pageable.getOffset()).limit(pageable.getPageSize());

        return PageableExecutionUtils.getPage(query.fetch(), pageable, query::fetchCount);
    }

    private ConstructorExpression<HistoryDTO> getExpr(QHistory history, boolean isAdmin) {
        QHistoryResultDTO historyResultDTO = new QHistoryResultDTO(history.resultCode);

        return isAdmin
                ? new QHistoryDTO(history.requestIp, history.user.email, historyResultDTO, history.createdTime)
                : new QHistoryDTO(history.requestIp, historyResultDTO, history.createdTime);
    }

    @Override
    protected Expression<? extends Comparable<?>> getExpression(String property) {
        return CREATED_TIME.equals(property) ? QHistory.history.createdTime : null;
    }

}
