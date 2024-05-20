package kr.jaeuuon.common.web.source.message.service.impl;

import kr.jaeuuon.common.basic.source.message.enumeration.Message;
import kr.jaeuuon.common.web.source.message.enumeration.impl.WebMessageImpl;
import kr.jaeuuon.common.web.source.message.service.MessageService;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

import java.util.stream.Stream;

/**
 * Valid 어노테이션의 message 값에 대한 Message를 찾는 인터페이스 구현.
 */
@Service
@ConditionalOnProperty(prefix = "spring.common.web.message", name = "use-service-impl", havingValue = "true")
public class MessageServiceImpl implements MessageService {

    @Override
    public Message getByName(String name) {
        return Stream.of(WebMessageImpl.values()).filter(message -> message.name().equals(name)).findAny().orElse(WebMessageImpl.ERROR_WEB_001);
    }

}