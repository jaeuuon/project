package kr.jaeuuon.common.jpa.source.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.sql.Timestamp;

/**
 * 공통 엔티티(생성/수정 시간).
 */
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Getter
public abstract class BaseModifiedTime extends BaseTime {

    @LastModifiedDate
    @Column(insertable = false)
    private Timestamp modifiedTime;

}
