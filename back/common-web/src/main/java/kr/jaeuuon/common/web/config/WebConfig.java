package kr.jaeuuon.common.web.config;

import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.context.annotation.Configuration;

/**
 * 프로젝트 설정.
 */
@Configuration
@ConfigurationPropertiesScan(basePackages = "kr.jaeuuon.common.web")
public class WebConfig {

}
