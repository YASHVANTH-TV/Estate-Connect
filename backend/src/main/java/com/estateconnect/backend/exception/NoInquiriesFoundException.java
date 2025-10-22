package com.estateconnect.backend.exception;

public class NoInquiriesFoundException extends RuntimeException {
    public NoInquiriesFoundException(String string) {
        super(string);
    }
}