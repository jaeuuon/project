package kr.jaeuuon.security.properties;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;

import javax.crypto.Cipher;
import java.security.GeneralSecurityException;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.Base64;


@ConfigurationProperties(prefix = "security")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SecurityProperties {

    private PrivateKey privateKey;
    private Cipher cipher;

    public void setPrivateKey(String privateKey) throws GeneralSecurityException {
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(Base64.getDecoder().decode(privateKey.getBytes()));

        this.privateKey = keyFactory.generatePrivate(keySpec);
        cipher = Cipher.getInstance("RSA");

        cipher.init(Cipher.DECRYPT_MODE, this.privateKey);
    }

    public String decrypt(String value) throws GeneralSecurityException {
        byte[] bytes = cipher.doFinal(Base64.getDecoder().decode(value.getBytes()));

        return new String(bytes);
    }

}
