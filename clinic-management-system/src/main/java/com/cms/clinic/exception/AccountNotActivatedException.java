package com.cms.clinic.exception;

public class AccountNotActivatedException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public AccountNotActivatedException() {
        super("Your have not activated your account yet.");
    }
}
