package com.DesafioMuralis.comercioSA.exceptions;

import org.springframework.http.HttpStatus;

public class ResourceAlreadyExistsException extends BaseBusinessException {
    public ResourceAlreadyExistsException(String message, String field) {
        super(message, field, HttpStatus.CONFLICT);
    }
}
