package kr.jaeuuon.common.jpa.source.user.entity;

import jakarta.persistence.*;
import kr.jaeuuon.common.jpa.source.code.impl.StatusCode;
import kr.jaeuuon.common.jpa.source.entity.BaseModifiedUserNonCreatedUser;
import kr.jaeuuon.common.jpa.source.entity.embeddable.Address;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.domain.Persistable;

import java.util.List;

/**
 * 사용자 엔티티.
 */
@Entity
@Table(catalog = "user", name = "tb_user", uniqueConstraints = @UniqueConstraint(name = "UNIQUE_EMAIL_FOR_USER", columnNames = "email"))
@DynamicInsert
@DynamicUpdate
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseModifiedUserNonCreatedUser implements Persistable<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false)
    private String email;

    @Column(length = 100, nullable = false)
    private String password;

    @Column(length = 50, nullable = false)
    private String name;

    @Embedded
    private Address address;

    @OneToMany(mappedBy = "user")
    private List<UserAuthority> authorities;

    @Column(length = 20, nullable = false)
    private StatusCode statusCode;

    @Override
    public boolean isNew() {
        return id == null;
    }

}
