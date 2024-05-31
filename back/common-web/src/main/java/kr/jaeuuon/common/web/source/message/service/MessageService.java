package kr.jaeuuon.common.web.source.message.service;

import kr.jaeuuon.common.basic.source.message.enumeration.Message;

public interface MessageService {

    Message getByName(String name);

}
