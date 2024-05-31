package kr.jaeuuon.common.web.source.annotation;

import kr.jaeuuon.common.web.source.event.CommonEvent;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface PublishEvent {

    Class<? extends CommonEvent<?>> event();

    String spel() default "";

    boolean isThrowing() default false;

}
