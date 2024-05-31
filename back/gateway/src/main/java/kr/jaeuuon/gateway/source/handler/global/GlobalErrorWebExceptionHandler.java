package kr.jaeuuon.gateway.source.handler.global;

import kr.jaeuuon.common.basic.source.dto.response.ResponseDTO;
import kr.jaeuuon.common.basic.source.dto.response.ResponseErrorDTO;
import kr.jaeuuon.common.basic.source.exception.CommonException;
import kr.jaeuuon.common.basic.source.message.enumeration.Message;
import kr.jaeuuon.common.basic.source.util.Util;
import kr.jaeuuon.gateway.source.util.GatewayUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.web.WebProperties.Resources;
import org.springframework.boot.autoconfigure.web.reactive.error.AbstractErrorWebExceptionHandler;
import org.springframework.boot.web.reactive.error.ErrorAttributes;
import org.springframework.context.ApplicationContext;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.codec.ServerCodecConfigurer;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.server.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Slf4j
@Order(-2)
@Component
public class GlobalErrorWebExceptionHandler extends AbstractErrorWebExceptionHandler {

    public GlobalErrorWebExceptionHandler(ErrorAttributes errorAttributes, Resources resources, ApplicationContext applicationContext, ServerCodecConfigurer serverCodecConfigurer) {
        super(errorAttributes, resources, applicationContext);

        super.setMessageReaders(serverCodecConfigurer.getReaders());
        super.setMessageWriters(serverCodecConfigurer.getWriters());
    }

    @Override
    protected RouterFunction<ServerResponse> getRoutingFunction(ErrorAttributes errorAttributes) {
        return RouterFunctions.route(RequestPredicates.all(), this::renderErrorResponse);
    }

    private Mono<ServerResponse> renderErrorResponse(ServerRequest request) {
        ServerWebExchange exchange = request.exchange();
        ServerHttpRequest httpRequest = exchange.getRequest();

        String requestIp = GatewayUtil.getRequestIp(exchange);
        String requestId = httpRequest.getId();

        Throwable error = getError(request);
        HttpStatus httpStatus = null;
        Message message;

        if (error instanceof CommonException ce) {
            httpStatus = ce.getHttpStatus();
            message = ce.getCustomMessage();

            log.error("[{}][{}][{}: {}({})][code: {}]", requestIp, requestId, getCallerClassAndMethodName(), error.getClass().getSimpleName(), message.getValue(), message);
        } else {
            if (error instanceof ResponseStatusException rse) {
                httpStatus = HttpStatus.resolve(rse.getStatusCode().value());
            }

            if (httpStatus == null) {
                httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
            }

            message = Util.getErrorMessageByHttpStatus(httpStatus);

            log.error("[{}][{}][{}: {}({})]", requestIp, requestId, getCallerClassAndMethodName(), error.getClass().getSimpleName(), message);
        }

        log.error("[{}][{}][uid: {}][{} {}][status: {}][code: {}]", requestIp, requestId, GatewayUtil.getUserId(httpRequest), httpRequest.getMethod().name(), httpRequest.getPath().value(), httpStatus, message);

        ResponseErrorDTO responseErrorDTO = new ResponseErrorDTO(message);
        ResponseDTO responseDTO = new ResponseDTO(request.path(), request.method().name(), message, responseErrorDTO);

        return ServerResponse.status(httpStatus).contentType(MediaType.APPLICATION_JSON).body(BodyInserters.fromValue(responseDTO));
    }

    private String getCallerClassAndMethodName() {
        StackTraceElement stackTraceElement = Thread.currentThread().getStackTrace()[2];

        return stackTraceElement.getClassName() + "." + stackTraceElement.getMethodName();
    }

}
