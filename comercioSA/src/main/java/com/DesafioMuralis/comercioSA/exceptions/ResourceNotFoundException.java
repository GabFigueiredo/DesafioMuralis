package com.DesafioMuralis.comercioSA.exceptions;

import org.springframework.http.HttpStatus;

public class ResourceNotFoundException extends BaseBusinessException  {
    public ResourceNotFoundException(String message, String field) {
        super(message, field, HttpStatus.NOT_FOUND);
    }
}
