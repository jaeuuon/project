package kr.jaeuuon.common.basic.source.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import kr.jaeuuon.common.basic.source.message.enumeration.Message;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.util.ObjectUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ResponseDataDTO {

    private String code;
    private String message;
    private List<?> content;
    private int elements;
    private long totalElements;
    private int size;
    private int page;
    private int totalPages;

    public ResponseDataDTO(Message message) {
        code = message.toString();
        this.message = message.getValue();

        setContentByEmpty();
    }

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

    private void setContentByPage(Page<?> contentPage) {
        content = contentPage.getContent();

        elements = contentPage.getNumberOfElements();
        totalElements = contentPage.getTotalElements();

        size = contentPage.getSize();

        page = (contentPage.getNumber() + 1);

        int totalPages = contentPage.getTotalPages();
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
