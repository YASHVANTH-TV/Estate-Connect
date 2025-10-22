package com.estateconnect.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<String> getUserAlreadyExistsException(UserAlreadyExistsException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.valueOf(409));
    }

    @ExceptionHandler(NoPropertiesFoundException.class)
    public ResponseEntity<String> getNoPropertiesFoundException(NoPropertiesFoundException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.valueOf(404));
    }

    @ExceptionHandler(DuplicatePropertyException.class)
    public ResponseEntity<String> getDuplicatePropertyException(DuplicatePropertyException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.valueOf(409));
    }
}