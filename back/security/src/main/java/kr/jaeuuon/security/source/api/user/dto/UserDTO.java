package kr.jaeuuon.security.source.api.user.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.querydsl.core.annotations.QueryProjection;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import kr.jaeuuon.common.jpa.source.entity.user.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserDTO {

    @NotBlank(message = "ERROR_SCR_ID_BLANK")
    private Long id;

    @NotBlank(message = "ERROR_SCR_EMAIL_BLANK")
    @Size(min = 4, max = 100, message = "ERROR_SCR_EMAIL_SIZE")
    @Email(message = "ERROR_SCR_EMAIL_FORMAT")
    private String email;

    @NotBlank(message = "ERROR_SCR_NAME_BLANK")
    @Size(min = 2, max = 50, message = "ERROR_SCR_NAME_SIZE")
    private String name;

    private AddressDTO address;

    @QueryProjection
    public UserDTO(Long id, String email, String name) {
        this.id = id;
        this.email = email;
        this.name = name;
    }

    public UserDTO(User user) {
        id = user.getId();
        email = user.getEmail();
        name = user.getName();
        address = new AddressDTO(user.getAddress());
    }

}
