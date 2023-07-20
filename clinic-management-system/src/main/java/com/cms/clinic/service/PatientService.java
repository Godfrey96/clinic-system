package com.cms.clinic.service;

import com.cms.clinic.dto.PatientDto;
import com.cms.clinic.dto.RegisterRequestDto;
import com.cms.clinic.entity.Patient;
import com.cms.clinic.entity.User;
import com.cms.clinic.exception.UserDoesNotExistException;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PatientService {

//    Patient addNewPatient(RegisterRequestDto registerRequest);
    ResponseEntity<String> addNewPatient(RegisterRequestDto registerRequestDto);
    void activateUser(String activationToken);
    Patient getSinglePatient();
    User getUserById(Long userId);
    ResponseEntity<String> updatePatientProfile(Long userId, PatientDto patient);
//    List<Patient> getPatientsByDoctor(Long doctorId);
}
