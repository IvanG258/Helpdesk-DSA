package com.businessmanager.businessManager.exceptions;

public class CustomErrorMessageException extends RuntimeException {
    public CustomErrorMessageException(String message) {
        super(message);
    }
}
