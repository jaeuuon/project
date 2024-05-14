package kr.jaeuuon.security.source.api.history.exception;

import kr.jaeuuon.common.basic.source.exception.CommonException;
import kr.jaeuuon.common.basic.source.message.enumeration.Message;
import org.springframework.http.HttpStatus;

/**
 * 사용자 로그인 기록 조회 Exception.
 */
public class HistoryException extends CommonException {

    public HistoryException(HttpStatus httpStatus, Message message) {
        super(httpStatus, message);
    }

}
