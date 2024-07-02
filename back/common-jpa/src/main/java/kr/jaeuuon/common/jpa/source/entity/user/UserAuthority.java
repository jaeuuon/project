package kr.jaeuuon.common.jpa.source.entity.user;

import jakarta.persistence.*;
import kr.jaeuuon.common.basic.source.code.impl.AuthorityCode;
import kr.jaeuuon.common.jpa.source.code.converter.AuthorityCodeConverter;
import kr.jaeuuon.common.jpa.source.code.impl.StatusCode;
import kr.jaeuuon.common.jpa.source.entity.ModifiedUser;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.domain.Persistable;

@Entity
@Table(schema = "common", name = "tb_user_authority")
@DynamicInsert
@DynamicUpdate
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserAuthority extends ModifiedUser implements Persistable<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(name = "tb_user_authority_fkey_user_id"))
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
