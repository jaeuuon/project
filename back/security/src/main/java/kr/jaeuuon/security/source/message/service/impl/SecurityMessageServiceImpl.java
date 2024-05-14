package kr.jaeuuon.security.source.message.service.impl;

import kr.jaeuuon.common.basic.source.message.enumeration.Message;
import kr.jaeuuon.common.web.source.message.enumeration.impl.WebMessageImpl;
import kr.jaeuuon.common.web.source.message.service.MessageService;
import kr.jaeuuon.security.source.message.enumeration.impl.SecurityMessageImpl;
import org.springframework.stereotype.Service;

import java.util.stream.Stream;

/**
 * Valid 어노테이션의 message 값에 대한 Message를 찾는 인터페이스 구현.
 */
@Service
public class SecurityMessageServiceImpl implements MessageService {

    @Override
    public Message getByName(String name) {
        Message message = Stream.of(SecurityMessageImpl.values()).filter(securityMessage -> securityMessage.name().equals(name)).findFirst().orElse(null);

        return message != null ? message : WebMessageImpl.ERROR_WEB_001;
    }

}
