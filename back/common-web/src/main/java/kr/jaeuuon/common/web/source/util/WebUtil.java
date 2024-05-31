package kr.jaeuuon.common.web.source.util;

import jakarta.servlet.http.HttpServletRequest;

public class WebUtil {

    public static String getPath(HttpServletRequest request) {
        return request.getContextPath() + request.getServletPath();
    }

}
