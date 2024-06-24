package kr.jaeuuon.security.source.jwt.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Jwt {

    private long userId;

    public Jwt(long userId) {
        this.userId = userId;
    }

}
