package kr.jaeuuon.gateway.config;

import org.springframework.boot.autoconfigure.web.WebProperties.Resources;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 프로젝트 설정.
 */
@Configuration
public class GatewayConfig {

    /**
     * AbstractErrorWebExceptionHandler 상속을 위한 등록.
     */
    @Bean
    public Resources resources() {
        return new Resources();
    }

}
