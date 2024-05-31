package kr.jaeuuon.common.jpa.source.repository;

import com.querydsl.core.types.OrderSpecifier;
import org.springframework.data.domain.Sort;

public interface BaseRepositoryCustom {

    OrderSpecifier<?>[] getOrders(Sort sort);

}
