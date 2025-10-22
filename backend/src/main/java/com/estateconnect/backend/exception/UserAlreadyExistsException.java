package com.estateconnect.backend.exception;

public class UserAlreadyExistsException extends RuntimeException {
    public UserAlreadyExistsException(String string) {
        super(string);
    }
}