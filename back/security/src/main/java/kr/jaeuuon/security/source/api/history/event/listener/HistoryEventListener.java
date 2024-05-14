package kr.jaeuuon.security.source.api.history.event.listener;

import kr.jaeuuon.security.source.api.authentication.event.AuthenticationEvent;
import kr.jaeuuon.security.source.api.history.service.HistoryService;
import kr.jaeuuon.security.source.security.userdetails.impl.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

/**
 * 이벤트 처리.
 */
@Component
@RequiredArgsConstructor
public class HistoryEventListener {

    private final HistoryService historyService;

    /**
     * 사용자 인증 이벤트 성공/실패 처리.
     */
    @Async
    @EventListener
    public void authenticationEventListener(AuthenticationEvent authenticationEvent) {
        UserDetailsImpl userDetailsImpl = authenticationEvent.getValue();

        if (userDetailsImpl != null) {
            historyService.add(authenticationEvent.getRequestIp(), authenticationEvent.getRequestId(), userDetailsImpl.getId(), authenticationEvent.getResultCode());
        }
    }

}
