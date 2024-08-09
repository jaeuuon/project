package kr.jaeuuon.security.source.api.user.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.querydsl.core.annotations.QueryProjection;
import jakarta.validation.constraints.Size;
import kr.jaeuuon.common.jpa.source.entity.embeddable.Address;
import kr.jaeuuon.common.jpa.source.entity.user.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AddressDTO {

    @Size(max = 10, message = "ERROR_SCR_POSTAL_CODE_SIZE")
    private String postalCode;

    @Size(max = 100, message = "ERROR_SCR_ADDRESS_SIZE")
    private String address;

    @Size(max = 200, message = "ERROR_SCR_DETAIL_ADDRESS_SIZE")
    private String detailAddress;

    public AddressDTO(Address address) {
        postalCode = address.getPostalCode();
        this.address = address.getAddress();
        detailAddress = address.getDetailAddress();
    }

}
