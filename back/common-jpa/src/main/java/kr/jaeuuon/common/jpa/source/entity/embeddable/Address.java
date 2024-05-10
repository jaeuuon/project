package kr.jaeuuon.common.jpa.source.entity.embeddable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 공통 주소 엔티티.
 */
@Embeddable
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Address {

    @Column(length = 10)
    private String postalCode;

    @Column(length = 100)
    private String address;

    @Column(length = 200)
    private String addressDetail;

}
