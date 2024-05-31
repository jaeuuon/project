package kr.jaeuuon.common.web.properties;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.util.AntPathMatcher;

import java.util.List;

@ConfigurationProperties(prefix = "spring.common.web.log")
@Setter
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class WithoutParameterProperties {

    private List<WithoutParameter> withoutParameters;

    private AntPathMatcher antPathMatcher = new AntPathMatcher();

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
