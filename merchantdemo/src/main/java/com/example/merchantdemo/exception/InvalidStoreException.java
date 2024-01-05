package com.example.merchantdemo.exception;

public class InvalidStoreException extends RuntimeException{
    public InvalidStoreException() {
    }

    public InvalidStoreException(String message) {
        super(message);
    }

    public InvalidStoreException(String message, Throwable cause) {
        super(message, cause);
    }

    public InvalidStoreException(Throwable cause) {
        super(cause);
    }
}
