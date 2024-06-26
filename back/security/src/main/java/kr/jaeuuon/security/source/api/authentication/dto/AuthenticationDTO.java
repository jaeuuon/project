package kr.jaeuuon.security.source.api.authentication.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AuthenticationDTO {

    @NotBlank(message = "ERROR_SCR_EMAIL_BLANK")
    @Size(min = 4, max = 100, message = "ERROR_SCR_EMAIL_SIZE")
    @Email(message = "ERROR_SCR_EMAIL_FORMAT")
    private String email;

    @NotBlank(message = "ERROR_SCR_PASSWORD_BLANK")
    @Size(min = 88, max = 88, message = "ERROR_SCR_PASSWORD_SIZE")
    private String password;

}
