package kr.jaeuuon.common.jpa.source.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Getter
public abstract class ModifiedUser extends ModifiedUserNonCreatedUser {

    @CreatedBy
    @Column(nullable = false, updatable = false)
    private Long createdUserId;

}
