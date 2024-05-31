package kr.jaeuuon.gateway.config;

import org.springframework.boot.autoconfigure.web.WebProperties.Resources;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

    @Bean
    public Resources resources() {
        return new Resources();
    }

}
