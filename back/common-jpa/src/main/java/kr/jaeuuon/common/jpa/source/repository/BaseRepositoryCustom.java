package kr.jaeuuon.common.jpa.source.repository;

import com.querydsl.core.types.OrderSpecifier;
import org.springframework.data.domain.Sort;

/**
 * 공통 레파지토리.
 */
public interface BaseRepositoryCustom {

    /**
     * 공통 정렬.
     */
    OrderSpecifier<?>[] getOrders(Sort sort);

}
