package kr.jaeuuon.security.source.jwt.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class JwtDTO {

    private String access;

    @JsonIgnore
    private String refresh;

    @JsonIgnore
    private long expirationMinutes;

    public JwtDTO(String access, String refresh, long expirationMinutes) {
        this.access = access;
        this.refresh = refresh;
        this.expirationMinutes = expirationMinutes;
    }

}
