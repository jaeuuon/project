package kr.jaeuuon.common.jpa.config;

import kr.jaeuuon.common.basic.source.util.Util;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.lang.NonNull;

import java.util.Optional;

@Configuration
public class AuditConfig implements AuditorAware<Long> {

    @NonNull
    @Override
    public Optional<Long> getCurrentAuditor() {
        return Optional.ofNullable(Util.getUserId(Util.getRequest()));
    }

}
