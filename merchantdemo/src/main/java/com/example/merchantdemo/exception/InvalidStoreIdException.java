package com.example.merchantdemo.exception;

public class InvalidStoreIdException extends RuntimeException{
    public InvalidStoreIdException() {
    }

    public InvalidStoreIdException(String message) {
        super(message);
    }

    public InvalidStoreIdException(String message, Throwable cause) {
        super(message, cause);
    }

    public InvalidStoreIdException(Throwable cause) {
        super(cause);
    }
}
