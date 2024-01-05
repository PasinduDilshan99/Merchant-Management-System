package com.example.merchantdemo.exception;

public class AlreadyUserExistException extends RuntimeException{
    public AlreadyUserExistException() {
    }

    public AlreadyUserExistException(String message) {
        super(message);
    }

    public AlreadyUserExistException(String message, Throwable cause) {
        super(message, cause);
    }

    public AlreadyUserExistException(Throwable cause) {
        super(cause);
    }
}
