package kr.jaeuuon.security.source.api.history.entity;

import jakarta.persistence.*;
import kr.jaeuuon.common.jpa.source.entity.BaseTime;
import kr.jaeuuon.common.jpa.source.user.entity.User;
import kr.jaeuuon.security.source.api.history.code.impl.ResultCode;
import kr.jaeuuon.security.source.api.history.code.impl.ResultCode.ResultCodeConverter;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.domain.Persistable;

@Entity
@Table(schema = "security", name = "tb_history")
@DynamicInsert
@DynamicUpdate
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class History extends BaseTime implements Persistable<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 20, nullable = false)
    private String requestIp;

    @Column(length = 20, nullable = false)
    private String requestId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(name = "tb_history_fkey_user_id"))
    private User user;

    @Column(length = 20, nullable = false)
    @Convert(converter = ResultCodeConverter.class)
    private ResultCode resultCode;

    public History(String requestIp, String requestId, long userId, ResultCode resultCode) {
        this.requestIp = requestIp;
        this.requestId = requestId;
        this.user = new User(userId);
        this.resultCode = resultCode;
    }

    @Override
    public boolean isNew() {
        return id == null;
    }

}
