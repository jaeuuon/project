package kr.jaeuuon.common.jpa.source.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

/**
 * 공통 엔티티(생성/수정 시간, 생성/수정자).
 */
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Getter
public abstract class BaseModifiedUserNonCreatedUser extends BaseTime {

    @LastModifiedDate
    @Column(insertable = false, columnDefinition = "DATETIME(3) ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime modifiedTime;

    @LastModifiedBy
    @Column(insertable = false)
    private Long modifiedUserId;

}
