package kr.jaeuuon.common.web.source.util;

import jakarta.servlet.http.HttpServletRequest;

/**
 * 프로젝트 유틸.
 */
public class WebUtil {

    /**
     * 요청 경로 리턴.
     */
    public static String getPath(HttpServletRequest request) {
        return request.getContextPath() + request.getServletPath();
    }

}
