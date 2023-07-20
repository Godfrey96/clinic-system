package com.cms.clinic.service.impl;

import com.cms.clinic.dto.AuthenticationRequestDto;
import com.cms.clinic.dto.AuthenticationResponse;
import com.cms.clinic.entity.User;
import com.cms.clinic.exception.AccountNotActivatedException;
import com.cms.clinic.exception.InvalidCredentialsException;
import com.cms.clinic.repositories.*;
import com.cms.clinic.service.AuthService;
import com.cms.clinic.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {
    private final PatientRepository patientRepository;
//    private final AdminRepository adminRepository;
//    private final ReceptionistRepository receptionistRepository;
    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsServiceImpl userDetailsService;
    private final JwtUtil jwtUtil;

    @Override
    public AuthenticationResponse login(AuthenticationRequestDto authenticationRequestDto) {
        String email = authenticationRequestDto.getEmail();
        String password = authenticationRequestDto.getPassword();

        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );
            if (auth.isAuthenticated()) {
                if (userDetailsService.getUserDetail().getEnabled().equalsIgnoreCase("true")) {
                    User user = getUserByEmail(email);
                    final UserDetails userDetails = userDetailsService.loadUserByUsername(email);
                    String jwtToken = jwtUtil.generateToken(userDetails);
                    return new AuthenticationResponse(user, jwtToken);
                } else {
                    throw new AccountNotActivatedException();
                }
            } else {
                System.out.println("Failed to login");
            }
        } catch (DisabledException e) {
//            throw new AccountNotActivatedException();
            e.printStackTrace();
        } catch (BadCredentialsException e) {
            throw new InvalidCredentialsException();
        }

        return new AuthenticationResponse(null, "Bad credentials");
    }

    private User getUserByEmail(String email) {
        User user = patientRepository.findByEmail(email);
        if (user == null) {
            user = userRepository.findByEmail(email);
        }
//        if (user == null) {
//            user = receptionistRepository.findByEmail(email);
//        }
        if (user == null) {
            user = doctorRepository.findByEmail(email);
        }
        return user;
    }
}
