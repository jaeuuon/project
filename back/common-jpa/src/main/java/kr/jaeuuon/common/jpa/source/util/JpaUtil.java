package kr.jaeuuon.common.jpa.source.util;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.EnumPath;
import kr.jaeuuon.common.jpa.source.code.impl.StatusCode;

public class JpaUtil {

    public static BooleanExpression equalsStatusCodeActivated(EnumPath<StatusCode> statusCode) {
        return statusCode.eq(StatusCode.ACTIVATED);
    }

}
