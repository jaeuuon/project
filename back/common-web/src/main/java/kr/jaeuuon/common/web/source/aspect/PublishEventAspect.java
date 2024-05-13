package kr.jaeuuon.common.web.source.aspect;

import kr.jaeuuon.common.basic.source.exception.CommonException;
import kr.jaeuuon.common.web.source.annotation.PublishEvent;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.expression.ExpressionParser;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.lang.reflect.InvocationTargetException;

/**
 * 이벤트 발생 AOP.
 */
@Aspect
@Component
@RequiredArgsConstructor
public class PublishEventAspect {

    private static final String SPEL_REGEX = "^#\\{(.*)\\}$";

    private static final ExpressionParser EXPRESSION_PARSER = new SpelExpressionParser();

    private final ApplicationEventPublisher applicationEventPublisher;

    /**
     * Pointcut(이벤트 발생 어노테이션).
     */
    @Pointcut("@annotation(publishEvent)")
    public void publishEvent(PublishEvent publishEvent) {
    }

    /**
     * AfterReturning(이벤트 발생 어노테이션).
     */
    @AfterReturning(pointcut = "publishEvent(publishEvent)", returning = "retVal")
    public void afterReturningPublishEvent(PublishEvent publishEvent, Object retVal) throws InstantiationException, IllegalAccessException, InvocationTargetException, NoSuchMethodException {
        Object event;

        if (retVal != null) {
            String spel = publishEvent.spel();

            if (StringUtils.hasText(spel) && spel.matches(SPEL_REGEX)) {
                spel = spel.replaceAll(SPEL_REGEX, "$1");
                Object value = EXPRESSION_PARSER.parseExpression(spel).getValue(retVal);

                if (value != null) {
                    event = publishEvent.event().getConstructor(value.getClass()).newInstance(value);
                } else {
                    event = publishEvent.event().getConstructor().newInstance();
                }
            } else {
                event = publishEvent.event().getConstructor(retVal.getClass()).newInstance(retVal);
            }
        } else {
            event = publishEvent.event().getConstructor().newInstance();
        }

        applicationEventPublisher.publishEvent(event);
    }

    /**
     * AfterThrowing(이벤트 발생 어노테이션).
     */
    @AfterThrowing(pointcut = "publishEvent(publishEvent)", throwing = "commonException")
    public void afterThrowingPublishEvent(PublishEvent publishEvent, CommonException commonException) throws InstantiationException, IllegalAccessException, InvocationTargetException, NoSuchMethodException {
        if (publishEvent.isThrowing()) {
            applicationEventPublisher.publishEvent(publishEvent.event().getConstructor(commonException.getClass()).newInstance(commonException));
        }
    }

}
