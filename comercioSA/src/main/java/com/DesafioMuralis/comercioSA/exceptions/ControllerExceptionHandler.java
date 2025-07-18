package com.DesafioMuralis.comercioSA.exceptions;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice 
public class ControllerExceptionHandler {
    
    @Autowired
    MessageSource messageSource;

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<ErrorMessageDTO>> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        List<ErrorMessageDTO> errorList = new ArrayList<>();
        
        e.getBindingResult().getFieldErrors().forEach(err -> {
            String message = messageSource.getMessage(err, LocaleContextHolder.getLocale());
            ErrorMessageDTO errorMessage = new ErrorMessageDTO(err.getField(), message);
            errorList.add(errorMessage);
        });

        return new ResponseEntity<>(errorList, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BaseBusinessException.class)
    public ResponseEntity<List<ErrorMessageDTO>> handleBaseBusinessException(BaseBusinessException e) {
        List<ErrorMessageDTO> errorMessageList = new ArrayList<>();
        ErrorMessageDTO errorMessage = new ErrorMessageDTO(e.getField(), e.getMessage());
        errorMessageList.add(errorMessage);

        return new ResponseEntity<>(errorMessageList, e.getStatus());
    }
}
