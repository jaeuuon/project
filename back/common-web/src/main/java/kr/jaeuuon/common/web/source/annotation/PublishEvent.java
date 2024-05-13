package kr.jaeuuon.common.web.source.annotation;

import kr.jaeuuon.common.web.source.event.CommonEvent;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 이벤트 발생 어노테이션.
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface PublishEvent {

    /**
     * 대상 이벤트.
     */
    Class<? extends CommonEvent<?>> event();

    /**
     * SpEL.
     */
    String spel() default "";

    /**
     * CommonException 발생 시의 이벤트 발생 여부.
     */
    boolean isThrowing() default false;

}
