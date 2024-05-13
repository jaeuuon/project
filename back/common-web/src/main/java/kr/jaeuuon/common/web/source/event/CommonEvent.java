package kr.jaeuuon.common.web.source.event;

/**
 * 프로젝트에서의 이벤트를 위한 인터페이스.
 */
public interface CommonEvent<T> {

    T getValue();

    boolean isThrowing();

}
