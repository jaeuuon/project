package kr.jaeuuon.gateway.source.handler.global;

import kr.jaeuuon.common.basic.source.dto.response.ResponseDTO;
import kr.jaeuuon.common.basic.source.dto.response.ResponseErrorDTO;
import kr.jaeuuon.common.basic.source.exception.CommonException;
import kr.jaeuuon.common.basic.source.logger.CommonLogger;
import kr.jaeuuon.common.basic.source.message.enumeration.Message;
import kr.jaeuuon.common.basic.source.util.Util;
import kr.jaeuuon.gateway.source.logger.GatewayLogger;
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

/**
 * 게이트웨이 오류 처리.
 */
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

    /**
     * AbstractErrorWebExceptionHandler 오류 응답 공통화.
     */
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

            CommonLogger.error(requestIp, requestId, Util.getCallerClassAndMethodName(), ce.getClass().getSimpleName(), message);
        } else {
            if (error instanceof ResponseStatusException rse) {
                httpStatus = HttpStatus.resolve(rse.getStatusCode().value());
            }

            if (httpStatus == null) {
                httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
            }

            message = Util.getErrorMessageByHttpStatus(httpStatus);

            CommonLogger.error(requestIp, requestId, Util.getCallerClassAndMethodName(), error.getClass().getSimpleName(), error.getMessage());
        }

        GatewayLogger.error(requestIp, requestId, httpRequest, httpStatus, message);

        ResponseErrorDTO responseErrorDTO = new ResponseErrorDTO(message);
        ResponseDTO responseDTO = new ResponseDTO(request.path(), request.method().name(), message, responseErrorDTO);

        return ServerResponse.status(httpStatus).contentType(MediaType.APPLICATION_JSON).body(BodyInserters.fromValue(responseDTO));
    }

}
