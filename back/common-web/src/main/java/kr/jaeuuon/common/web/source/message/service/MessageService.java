package kr.jaeuuon.common.web.source.message.service;

import kr.jaeuuon.common.basic.source.message.enumeration.Message;

/**
 * Valid 어노테이션의 message 값에 대한 Message를 찾는 인터페이스.
 */
public interface MessageService {

    Message getByName(String name);

}
