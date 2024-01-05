package com.example.merchantdemo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.time.LocalDateTime;

@ControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler
    public ResponseEntity<Object> handleException(InvalidUserIdException ex) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        String message = "Invalid input. User ID must be a positive integer.";
        LocalDateTime timestamp = LocalDateTime.now();

        ErrorResponse errorResponse = new ErrorResponse(timestamp, status.value(), message);

        return new ResponseEntity<>(errorResponse, status);
    }
    @ExceptionHandler
    public ResponseEntity<Object> handleException(InvalidStoreIdException ex) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        String message = "Invalid input. Store ID must be a positive integer.";
        LocalDateTime timestamp = LocalDateTime.now();

        ErrorResponse errorResponse = new ErrorResponse(timestamp, status.value(), message);

        return new ResponseEntity<>(errorResponse, status);
    }
    @ExceptionHandler(value = {MethodArgumentTypeMismatchException.class})
    public ResponseEntity<Object> handleMethodArgumentTypeMismatch(MethodArgumentTypeMismatchException ex) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        String message = "please enter correct value";
        LocalDateTime timestamp = LocalDateTime.now();

        ErrorResponse errorResponse = new ErrorResponse(timestamp, status.value(), message);

        return new ResponseEntity<>(errorResponse, status);
    }

    @ExceptionHandler
    public ResponseEntity<Object> handleException(HttpMessageNotReadableException ex) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        String message = "Invalid input.";
        LocalDateTime timestamp = LocalDateTime.now();

        ErrorResponse errorResponse = new ErrorResponse(timestamp, status.value(), message);

        return new ResponseEntity<>(errorResponse, status);
    }


    @ExceptionHandler(value = {InvalidPhoneNumberException.class})
    public ResponseEntity<Object> handleException(InvalidPhoneNumberException ex) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        String message = "Invalid mobile number. mobile number must be contain 9 characters without 0.";
        LocalDateTime timestamp = LocalDateTime.now();

        ErrorResponse errorResponse = new ErrorResponse(timestamp, status.value(), message);

        return new ResponseEntity<>(errorResponse, status);
    }

    @ExceptionHandler(value = {InvalidInputsStringException.class})
    public ResponseEntity<Object> handleException(InvalidInputsStringException ex) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        String message = "you cant enter non-numeric values";
        LocalDateTime timestamp = LocalDateTime.now();

        ErrorResponse errorResponse = new ErrorResponse(timestamp, status.value(), message);

        return new ResponseEntity<>(errorResponse, status);
    }

    @ExceptionHandler(value = {AlreadyUserExistException.class})
    public ResponseEntity<Object> handleException(AlreadyUserExistException ex) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        String message = "Already User Exists";
        LocalDateTime timestamp = LocalDateTime.now();

        ErrorResponse errorResponse = new ErrorResponse(timestamp, status.value(), message);

        return new ResponseEntity<>(errorResponse, status);
    }

    @ExceptionHandler(value = {UserDoesNotExistsException.class})
    public ResponseEntity<Object> handleException(UserDoesNotExistsException ex) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        String message = "User does not Exist";
        LocalDateTime timestamp = LocalDateTime.now();

        ErrorResponse errorResponse = new ErrorResponse(timestamp, status.value(), message);

        return new ResponseEntity<>(errorResponse, status);
    }

    @ExceptionHandler(value = {EmptyUserInputsException.class})
    public ResponseEntity<Object> handleException(EmptyUserInputsException ex) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        String message = "please fill the all inputs";
        LocalDateTime timestamp = LocalDateTime.now();

        ErrorResponse errorResponse = new ErrorResponse(timestamp, status.value(), message);

        return new ResponseEntity<>(errorResponse, status);
    }
    @ExceptionHandler(value = {InvalidStoreException.class})
    public ResponseEntity<Object> handleException(InvalidStoreException ex) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        String message = "Store not Exists";
        LocalDateTime timestamp = LocalDateTime.now();

        ErrorResponse errorResponse = new ErrorResponse(timestamp, status.value(), message);

        return new ResponseEntity<>(errorResponse, status);
    }



}
