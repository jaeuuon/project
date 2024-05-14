package kr.jaeuuon.security.source.jwt.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * JWT 엔티티(Redis).
 */
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Jwt {

    private String refresh;

    public Jwt(String refresh) {
        this.refresh = refresh;
    }

}
