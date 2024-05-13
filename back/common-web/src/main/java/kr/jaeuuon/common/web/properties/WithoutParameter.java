package kr.jaeuuon.common.web.properties;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 오류 시 로그에서 파라미터를 출력하지 않을 메서드와 경로.
 */
@Setter
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class WithoutParameter {

    private String method;
    private String path;

}
