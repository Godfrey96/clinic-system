package com.cms.clinic.service.impl;

import com.cms.clinic.dto.PatientDto;
import com.cms.clinic.dto.RegisterRequestDto;
import com.cms.clinic.entity.Patient;
import com.cms.clinic.entity.Role;
import com.cms.clinic.entity.User;
import com.cms.clinic.exception.EmailAlreadyTakenException;
import com.cms.clinic.exception.UserDoesNotExistException;
import com.cms.clinic.jwt.JwtRequestFilter;
import com.cms.clinic.repositories.PatientRepository;
import com.cms.clinic.repositories.RoleRepository;
import com.cms.clinic.repositories.UserRepository;
import com.cms.clinic.service.EmailService;
import com.cms.clinic.service.PatientService;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class PatientServiceImpl implements PatientService {

    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final JwtRequestFilter authenticationFilter;

    private String baseUrl = "http://localhost:8081/api/v1/patient";

    @Override
    public ResponseEntity<String> addNewPatient(RegisterRequestDto registerRequestDto) {
        log.info("Inside addNewPatient {} ", registerRequestDto);
        try {
            if (validateSignUp(registerRequestDto)) {
                Patient patient = patientRepository.findByEmail(registerRequestDto.getEmail());
                if (Objects.isNull(patient)) {
                    patientRepository.save(getPatientFromMap(registerRequestDto));
                    return new ResponseEntity<>("Your account is registered successfully. " +
                            "Please check your email to activate your account before you continue using our system", HttpStatus.CREATED);
                } else {
                    return new ResponseEntity<>("Email is already taken", HttpStatus.BAD_REQUEST);
                }
            } else {
                return new ResponseEntity<>("All fields are required",HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public void activateUser(String activationToken) {
        Patient user = patientRepository.findByActivationToken(activationToken);
        if (user != null) {
            user.setEnabled("true");
            user.setActivationToken(null);
            patientRepository.save(user);
        } else {
            throw new IllegalArgumentException("Invalid activation token.");
        }
    }

    @Override
    public Patient getSinglePatient() {
        try {
            var patient = patientRepository.findByEmail(authenticationFilter.getCurrentUser());

            if (patient != null) {
                patient.getUserId();
                patient.getFirstName();
                patient.getLastName();
                patient.getContactNo();
                patient.getEmail();
                patient.getAddress();
                return patient;
            } else {
                throw new UserDoesNotExistException();
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        throw new UserDoesNotExistException();
    }

    @Override
    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserDoesNotExistException());
    }

    @Override
    public ResponseEntity<String> updatePatientProfile(Long userId, PatientDto patient) {
        try{
            Patient user = patientRepository.findById(userId).orElseThrow(() -> new UserDoesNotExistException());

            if(!user.equals(null)){
                user.setFirstName(patient.getFirstName());
                user.setLastName(patient.getLastName());
                user.setContactNo(patient.getContactNo());
                user.setEmail(patient.getEmail());
                user.setAddress(patient.getAddress());
                patientRepository.save(user);

                return new ResponseEntity<>("Profile details updated successfully", HttpStatus.OK);

            } else {
                return new ResponseEntity<>("Failed to update profile details", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception error){
            error.printStackTrace();
        }
        return  new ResponseEntity<>("Something went wrong",HttpStatus.INTERNAL_SERVER_ERROR);
    }


    private void sendActivationEmail(Patient user) {
        try {
            emailService.sendSimpleEmail(user.getEmail(),
                    "Dear " + user.getFirstName() + "\n\n"
                            + "Please click the following link to activate your account:\n"
                            + baseUrl + "/activate?token=" + user.getActivationToken(),
                    "Account Verification");
        } catch (Exception e) {
            throw new RuntimeException("Error while sendi" +
                    "ng the activation link");
        }
    }

    private String generateActivationToken() {
        return UUID.randomUUID().toString();
    }

    private boolean validateSignUp(RegisterRequestDto requestDto) {
        if (requestDto.getFirstName() == null || requestDto.getFirstName().isEmpty()
                || requestDto.getLastName() == null || requestDto.getLastName().isEmpty()
                || requestDto.getEmail() == null || requestDto.getEmail().isEmpty()
                || requestDto.getPassword() == null || requestDto.getPassword().isEmpty()) {
            return false;
        }
        return true;
    }

    private Patient getPatientFromMap(RegisterRequestDto registerRequest) {

        Role role = roleRepository.findByRoleName("PATIENT").get();

        Patient patient = new Patient();

        patient.setFirstName(registerRequest.getFirstName());
        patient.setLastName(registerRequest.getLastName());
        patient.setEmail(registerRequest.getEmail());
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        patient.setRoles(roles);
        patient.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        patient.setEnabled("false");

        String activationToken = generateActivationToken();
        patient.setActivationToken(activationToken);

        sendActivationEmail(patient);

        return patient;
    }
}
