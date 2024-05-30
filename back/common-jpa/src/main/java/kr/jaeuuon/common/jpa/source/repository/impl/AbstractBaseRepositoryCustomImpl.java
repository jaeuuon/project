package kr.jaeuuon.common.jpa.source.repository.impl;

import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import kr.jaeuuon.common.jpa.source.repository.BaseRepositoryCustom;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.List;

/**
 * 공통 레파지토리 구현.
 */
public abstract class AbstractBaseRepositoryCustomImpl implements BaseRepositoryCustom {

    protected static final String CREATED_TIME = "created_time";

    /**
     * 정렬 프로퍼티에 대한 컬럼 리턴.
     */
    protected abstract Expression<? extends Comparable<?>> getExpression(String property);

    /**
     * 공통 정렬 구현.
     */
    @Override
    public OrderSpecifier<?>[] getOrders(Sort sort) {
        List<OrderSpecifier<?>> orders = new ArrayList<>();

        sort.stream().forEach(item -> {
            Expression<? extends Comparable<?>> expression = getExpression(item.getProperty());

            if (expression != null) {
                orders.add(new OrderSpecifier<>(item.isAscending() ? Order.ASC : Order.DESC, expression));
            }
        });

        if (sort.stream().noneMatch(item -> CREATED_TIME.equals(item.getProperty()))) {
            orders.add(new OrderSpecifier<>(Order.DESC, getExpression(CREATED_TIME)));
        }

        return orders.toArray(OrderSpecifier[]::new);
    }

}
