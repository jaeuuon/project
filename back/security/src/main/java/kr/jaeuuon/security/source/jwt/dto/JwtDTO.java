package kr.jaeuuon.security.source.jwt.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class JwtDTO {

    @JsonIgnore
    private String access;

    @NotBlank(message = "ERROR_SCR_JWT_REFRESH_BLANK")
    private String refresh;

    public JwtDTO(String access, String refresh) {
        this.access = access;
        this.refresh = refresh;
    }

}
