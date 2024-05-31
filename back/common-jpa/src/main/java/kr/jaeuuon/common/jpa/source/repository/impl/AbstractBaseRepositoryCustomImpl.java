package kr.jaeuuon.common.jpa.source.repository.impl;

import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import kr.jaeuuon.common.jpa.source.repository.BaseRepositoryCustom;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.List;

public abstract class AbstractBaseRepositoryCustomImpl implements BaseRepositoryCustom {

    protected static final String CREATED_TIME = "created_time";

    protected abstract Expression<? extends Comparable<?>> getExpression(String property);

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
