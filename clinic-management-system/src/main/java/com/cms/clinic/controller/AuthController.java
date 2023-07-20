package com.cms.clinic.controller;

import com.cms.clinic.dto.AuthenticationRequestDto;
import com.cms.clinic.dto.AuthenticationResponse;
import com.cms.clinic.exception.AccountNotActivatedException;
import com.cms.clinic.exception.InvalidCredentialsException;
import com.cms.clinic.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
@CrossOrigin("*")
public class AuthController {

    private final AuthService authService;

    @ExceptionHandler({AccountNotActivatedException.class})
    public ResponseEntity<String> handleAccountNotActivated() {
        return new ResponseEntity<>("Your have not activated your account yet.", HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler({InvalidCredentialsException.class})
    public ResponseEntity<String> handleInvalidCredentials() {
        return new ResponseEntity<>("Invalid email or password entered", HttpStatus.BAD_REQUEST);
    }
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequestDto request) {
        return new ResponseEntity<>(authService.login(request), HttpStatus.OK);
    }
}
