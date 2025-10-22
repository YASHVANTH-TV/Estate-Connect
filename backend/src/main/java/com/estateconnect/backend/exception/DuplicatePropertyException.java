package com.estateconnect.backend.exception;

public class DuplicatePropertyException extends RuntimeException {
    public DuplicatePropertyException(String string) {
        super(string);
    }
}