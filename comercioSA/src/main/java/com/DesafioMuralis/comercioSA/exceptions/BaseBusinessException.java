package com.DesafioMuralis.comercioSA.exceptions;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public abstract class BaseBusinessException extends RuntimeException {
    private final HttpStatus status;
    private final String field;

    public BaseBusinessException(String message, String field, HttpStatus status) {
        super(message);
        this.status = status;
        this.field = field;
    }

}
