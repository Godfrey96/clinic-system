package com.cms.clinic.service;

import com.cms.clinic.dto.*;
import com.cms.clinic.entity.User;
import org.springframework.http.ResponseEntity;

public interface UserService {
    ResponseEntity<String> changePassword(PasswordChangeDto passwordChangeDto);
    ResponseEntity<String> updateAdminProfile(Long userId, UserDto user);
    ResponseEntity<String> updatePatientProfile(Long userId, PatientDto user);
    ResponseEntity<String> updateDoctorProfile(Long userId, DoctorDto user);
    ResponseEntity<String> updateReceptionProfile(Long userId, UserDto user);
    User getSingleUser();
    ResponseEntity<String> updateProfile(Long userId, UserDto user);

}
