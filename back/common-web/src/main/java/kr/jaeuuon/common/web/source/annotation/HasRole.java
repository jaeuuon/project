package kr.jaeuuon.common.web.source.annotation;

import kr.jaeuuon.common.basic.source.code.impl.AuthorityCode;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 역할 체크 어노테이션.
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface HasRole {

    /**
     * 대상 역할.
     */
    AuthorityCode[] value() default {};

}
