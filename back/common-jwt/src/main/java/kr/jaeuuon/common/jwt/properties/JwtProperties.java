package kr.jaeuuon.common.jwt.properties;

import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.security.Key;

@ConfigurationProperties(prefix = "jwt")
@Setter
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class JwtProperties {

    private String secret;
    private Key key;

    private long accessExpirationMinutes;
    private long refreshExpirationMinutes;

    public void setSecret(String secret) {
        this.secret = secret;
        key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
    }

}
