package kr.jaeuuon.security.source.api.authentication.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 로그인 시 사용.
 */
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AuthenticationDTO {

    @NotBlank(message = "ERROR_SECU_EMAIL_BLANK")
    @Size(min = 4, max = 100, message = "ERROR_SECU_EMAIL_SIZE")
    @Email(message = "ERROR_SECU_EMAIL_FORMAT")
    private String email;

    @NotBlank(message = "ERROR_SECU_PASSWORD_BLANK")
    @Size(min = 4, max = 50, message = "ERROR_SECU_PASSWORD_SIZE")
    private String password;

}
