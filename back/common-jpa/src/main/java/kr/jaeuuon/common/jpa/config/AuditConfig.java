package kr.jaeuuon.common.jpa.config;

import kr.jaeuuon.common.basic.source.util.Util;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.lang.NonNull;

import java.util.Optional;

/**
 * Auditor 설정.
 */
@Configuration
public class AuditConfig implements AuditorAware<Long> {

    /**
     * 헤더에서 사용자 아이디를 가져와 데이터의 등록자/수정자 입력.
     */
    @NonNull
    @Override
    public Optional<Long> getCurrentAuditor() {
        return Optional.ofNullable(Util.getUserId());
    }

}
