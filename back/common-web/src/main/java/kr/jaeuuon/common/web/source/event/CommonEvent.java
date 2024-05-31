package kr.jaeuuon.common.web.source.event;

public interface CommonEvent<T> {

    T getValue();

    boolean isThrowing();

}
