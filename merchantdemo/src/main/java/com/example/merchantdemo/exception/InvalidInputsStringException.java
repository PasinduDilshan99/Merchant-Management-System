package com.example.merchantdemo.exception;

public class InvalidInputsStringException extends RuntimeException{

    public InvalidInputsStringException() {
    }

    public InvalidInputsStringException(String message) {
        super(message);
    }

    public InvalidInputsStringException(String message, Throwable cause) {
        super(message, cause);
    }

    public InvalidInputsStringException(Throwable cause) {
        super(cause);
    }
}
