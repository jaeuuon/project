package kr.jaeuuon.common.jpa.source.entity.user;

import jakarta.persistence.*;
import kr.jaeuuon.common.jpa.source.code.impl.StatusCode;
import kr.jaeuuon.common.jpa.source.entity.ModifiedUserNonCreatedUser;
import kr.jaeuuon.common.jpa.source.entity.embeddable.Address;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.domain.Persistable;

import java.util.List;

@Entity
@Table(schema = "common", name = "tb_user", uniqueConstraints = @UniqueConstraint(name = "tb_user_ukey_email", columnNames = "email"))
@DynamicInsert
@DynamicUpdate
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends ModifiedUserNonCreatedUser implements Persistable<Long> {

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

    public User(long id) {
        this.id = id;
    }

    @Override
    public boolean isNew() {
        return id == null;
    }

}
