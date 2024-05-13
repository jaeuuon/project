package kr.jaeuuon.common.cache.config;

import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 캐시 설정.
 */
@EnableCaching
@Configuration
public class CacheConfig {

    /**
     * 캐시 매니저 설정.
     */
    @Bean
    public CacheManager cacheManager() {
        return null;
    }

}
