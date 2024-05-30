package kr.jaeuuon.common.web.source.message.enumeration.impl;

import kr.jaeuuon.common.basic.source.message.enumeration.Message;
import kr.jaeuuon.common.basic.source.message.enumeration.MessageStatus;
import kr.jaeuuon.common.basic.source.message.enumeration.impl.MessageStatusImpl;
import lombok.Getter;

/**
 * 프로젝트 메시지 구현.
 */
@Getter
public enum WebMessageImpl implements Message {

    SUCCESS_WEB_GET(MessageStatusImpl.SUCCESS, "조회에 성공했습니다."),
    SUCCESS_WEB_POST(MessageStatusImpl.SUCCESS, "등록에 성공했습니다."),
    SUCCESS_WEB_PATCH(MessageStatusImpl.SUCCESS, "수정에 성공했습니다."),
    SUCCESS_WEB_DELETE(MessageStatusImpl.SUCCESS, "삭제에 성공했습니다.");

    private final MessageStatus status;
    private final String value;

    WebMessageImpl(MessageStatus status, String value) {
        this.status = status;
        this.value = value;
    }

}
