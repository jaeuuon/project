package kr.jaeuuon.common.jwt.config;

import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.context.annotation.Configuration;

/**
 * 프로젝트 설정.
 */
@Configuration
@ConfigurationPropertiesScan(basePackages = "it.jaeuuon.common.jwt")
public class JwtConfig {

}
