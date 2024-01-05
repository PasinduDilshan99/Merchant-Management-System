package com.example.merchantdemo.exception;

public class EmptyUserInputsException extends RuntimeException{
    public EmptyUserInputsException() {
    }

    public EmptyUserInputsException(String message) {
        super(message);
    }

    public EmptyUserInputsException(String message, Throwable cause) {
        super(message, cause);
    }

    public EmptyUserInputsException(Throwable cause) {
        super(cause);
    }
}
