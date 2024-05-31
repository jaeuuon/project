package kr.jaeuuon.security.source.message.service.impl;

import kr.jaeuuon.common.basic.source.message.enumeration.Message;
import kr.jaeuuon.common.basic.source.message.enumeration.impl.MessageImpl;
import kr.jaeuuon.common.web.source.message.service.MessageService;
import kr.jaeuuon.security.source.message.enumeration.impl.SecurityMessageImpl;
import org.springframework.stereotype.Service;

import java.util.stream.Stream;

@Service
public class SecurityMessageServiceImpl implements MessageService {

    @Override
    public Message getByName(String name) {
        Message message = Stream.of(SecurityMessageImpl.values()).filter(securityMessage -> securityMessage.name().equals(name)).findAny().orElse(null);

        return message != null ? message : MessageImpl.ERROR_BSC_BAD_REQUEST;
    }

}
