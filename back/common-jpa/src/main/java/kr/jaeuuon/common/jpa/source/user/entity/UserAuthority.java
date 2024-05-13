package kr.jaeuuon.common.jpa.source.user.entity;

import jakarta.persistence.*;
import kr.jaeuuon.common.basic.source.code.impl.AuthorityCode;
import kr.jaeuuon.common.jpa.source.code.converter.AuthorityCodeConverter;
import kr.jaeuuon.common.jpa.source.code.impl.StatusCode;
import kr.jaeuuon.common.jpa.source.entity.BaseModifiedUser;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.domain.Persistable;

/**
 * 사용자 ↔ 권한 매핑 엔티티.
 */
@Entity
@Table(catalog = "user", name = "tb_user_authority")
@DynamicInsert
@DynamicUpdate
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserAuthority extends BaseModifiedUser implements Persistable<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(name = "FOREIGN_USER_ID_FOR_USER_AUTHORITY"))
    private User user;

    @Column(length = 20, nullable = false)
    @Convert(converter = AuthorityCodeConverter.class)
    private AuthorityCode authorityCode;

    @Column(length = 20, nullable = false)
    private StatusCode statusCode;

    @Override
    public boolean isNew() {
        return id == null;
    }

}
