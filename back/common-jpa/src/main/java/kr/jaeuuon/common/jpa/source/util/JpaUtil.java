package kr.jaeuuon.common.jpa.source.util;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.EnumPath;
import kr.jaeuuon.common.jpa.source.code.impl.StatusCode;

/**
 * Querydsl 유틸.
 */
public class JpaUtil {

    /**
     * 데이터 상태 조건.
     */
    public static BooleanExpression equalsStatusCodeActivated(EnumPath<StatusCode> statusCode) {
        return statusCode.eq(StatusCode.ACTIVATED);
    }

}
