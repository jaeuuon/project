package kr.jaeuuon.common.jwt.config;

import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationPropertiesScan(basePackages = "kr.jaeuuon.common.jwt")
public class JwtConfig {

}
