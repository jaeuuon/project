package kr.jaeuuon.security.source.api.user.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.querydsl.core.annotations.QueryProjection;
import kr.jaeuuon.common.jpa.source.entity.embeddable.Address;
import kr.jaeuuon.common.jpa.source.entity.user.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AddressDTO {

    private String postalCode;
    private String address;
    private String addressDetail;

    public AddressDTO(Address address) {
        postalCode = address.getPostalCode();
        this.address = address.getAddress();
        addressDetail = address.getAddressDetail();
    }

}
