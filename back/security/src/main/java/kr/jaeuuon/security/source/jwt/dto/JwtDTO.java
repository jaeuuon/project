package kr.jaeuuon.security.source.jwt.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 로그인/재발급 시 사용.
 */
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class JwtDTO {

    @JsonIgnore
    private String access;

    @NotBlank(message = "ERROR_SECU_JWT_001")
    private String refresh;

    public JwtDTO(String access, String refresh) {
        this.access = access;
        this.refresh = refresh;
    }

}
