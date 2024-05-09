package kr.jaeuuon.common.basic.source.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategies.SnakeCaseStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import kr.jaeuuon.common.basic.source.message.enumeration.Message;
import lombok.Getter;
import org.springframework.data.domain.Page;
import org.springframework.util.ObjectUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * 성공 응답 시 사용.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonNaming(SnakeCaseStrategy.class)
@Getter
public class ResponseDataDTO {

    private final String code;
    private final String message;
    private List<?> content;
    private int elements;
    private long totalElements;
    private int size;
    private int page;
    private int totalPages;

    /**
     * 오류 응답 시의 리턴.
     */
    public ResponseDataDTO() {
        code = null;
        message = null;

        setContentByEmpty();
    }

    /**
     * 성공 응답 시의 리턴.
     */
    public ResponseDataDTO(Message message, Object content) {
        code = message.toString();
        this.message = message.getValue();

        if (ObjectUtils.isEmpty(content)) {
            setContentByEmpty();
        } else {
            if (content instanceof Page<?> contentPage) {
                setContentByPage(contentPage);
            } else {
                setContent(content);
            }
        }
    }

    private void setContentByEmpty() {
        content = new ArrayList<>();

        elements = 0;
        totalElements = 0L;

        size = 0;

        page = 1;
        totalPages = 1;
    }

    private void setContentByPage(Page<?> page) {
        content = page.getContent();

        elements = page.getNumberOfElements();
        totalElements = page.getTotalElements();

        size = page.getSize();

        this.page = (page.getNumber() + 1);

        int totalPages = page.getTotalPages();
        this.totalPages = totalPages > 0 ? totalPages : 1;
    }

    private void setContent(Object content) {
        if (content instanceof List<?> contents) {
            this.content = contents;
        } else {
            this.content = Collections.singletonList(content);
        }

        int size = this.content.size();

        elements = size;
        totalElements = size;

        this.size = size;

        page = 1;
        totalPages = 1;
    }

}