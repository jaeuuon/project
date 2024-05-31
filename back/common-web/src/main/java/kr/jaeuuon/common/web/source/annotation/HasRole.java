package kr.jaeuuon.common.web.source.annotation;

import kr.jaeuuon.common.basic.source.code.impl.AuthorityCode;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface HasRole {

    AuthorityCode[] value() default {};

}
