package com.estateconnect.backend.exception;

public class NoPropertiesFoundException extends RuntimeException {
    public NoPropertiesFoundException(String string) {
        super(string);
    }
}