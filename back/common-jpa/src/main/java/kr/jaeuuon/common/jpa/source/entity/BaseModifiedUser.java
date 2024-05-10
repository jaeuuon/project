package kr.jaeuuon.common.jpa.source.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

/**
 * 공통 엔티티(생성/수정 시간, 생성/수정자).
 */
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Getter
public abstract class BaseModifiedUser extends BaseModifiedUserNonCreatedUser {

    @CreatedBy
    @Column(nullable = false, updatable = false)
    private Long createdUserId;

}
