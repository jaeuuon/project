package kr.jaeuuon.common.web.properties;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.util.AntPathMatcher;

import java.util.List;

/**
 * 오류 시 로그에서 파라미터를 출력하지 않을 메서드와 경로 목록.
 */
@ConfigurationProperties(prefix = "spring.common.web.log")
@Setter
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class WithoutParameterProperties {

    private List<WithoutParameter> withoutParameters;

    private AntPathMatcher antPathMatcher = new AntPathMatcher();

    /**
     * 해당 메서드와 경로가 출력하지 않을 대상인지 확인.
     */
    public boolean isWithout(String method, String path) {
        if (withoutParameters == null) {
            return false;
        }

        return withoutParameters.stream().anyMatch(withoutParameter -> {
            boolean isEqualsMethod = false;
            boolean isEqualsPath = false;

            if (withoutParameter.getMethod() == null || (withoutParameter.getMethod().equals(method))) {
                isEqualsMethod = true;
            }

            if (withoutParameter.getPath() == null || antPathMatcher.match(withoutParameter.getPath(), path)) {
                isEqualsPath = true;
            }

            return isEqualsMethod && isEqualsPath;
        });
    }

}
