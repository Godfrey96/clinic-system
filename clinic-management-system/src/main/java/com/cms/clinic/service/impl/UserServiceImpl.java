package com.cms.clinic.service.impl;

import com.cms.clinic.dto.*;
//import com.cms.clinic.entity.Admin;
import com.cms.clinic.entity.Doctor;
import com.cms.clinic.entity.Patient;
//import com.cms.clinic.entity.Receptionist;
import com.cms.clinic.entity.User;
import com.cms.clinic.exception.UserDoesNotExistException;
import com.cms.clinic.jwt.JwtRequestFilter;
import com.cms.clinic.repositories.*;
import com.cms.clinic.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
//    private final AdminRepository adminRepository;
    private final DoctorRepository doctorRepository;
//    private final ReceptionistRepository receptionistRepository;
    private final JwtRequestFilter jwtRequestFilter;
    private final PasswordEncoder passwordEncoder;

    @Override
    public ResponseEntity<String> changePassword(PasswordChangeDto passwordChangeDto) {
        try {
            var user = userRepository.findByEmail(jwtRequestFilter.getCurrentUser());
            if (!user.equals(null)){
                if (passwordEncoder.matches(passwordChangeDto.getOldPassword(), user.getPassword())){
                    user.setPassword(passwordEncoder.encode(passwordChangeDto.getNewPassword()));
                    userRepository.save(user);
                    return new ResponseEntity<>("Password updated successfully", HttpStatus.OK);
                } else{
                    return new ResponseEntity<>("Incorrect current password", HttpStatus.BAD_REQUEST);
                }
            }
        }  catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("Something went wrong",HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateAdminProfile(Long userId, UserDto updateUser) {
        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new UserDoesNotExistException());

            if(!user.equals(null)){
                user.setFirstName(updateUser.getFirstName());
                user.setLastName(updateUser.getLastName());
                user.setContactNo(updateUser.getContactNo());
                user.setEmail(updateUser.getEmail());
                user.setAddress(updateUser.getAddress());
//                user.setUsername(updateUser.getUsername());

                userRepository.save(user);

                return new ResponseEntity<>("Profile details updated successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Failed to update profile details", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("Something went wrong",HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updatePatientProfile(Long userId, PatientDto patient) {
        try {
            Patient user = patientRepository.findById(userId)
                    .orElseThrow(() -> new UserDoesNotExistException());

            if(!user.equals(null)){
                user.setFirstName(patient.getFirstName());
                user.setLastName(patient.getLastName());
                user.setContactNo(patient.getContactNo());
                user.setEmail(patient.getEmail());
                user.setAddress(patient.getAddress());
                user.setBloodGroup(patient.getBloodGroup());

                userRepository.save(user);

                return new ResponseEntity<>("Profile details updated successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Failed to update profile details", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("Something went wrong",HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateDoctorProfile(Long userId, DoctorDto doctor) {
        try {
            Doctor user = doctorRepository.findById(userId)
                    .orElseThrow(() -> new UserDoesNotExistException());

            if(!user.equals(null)){
                user.setFirstName(doctor.getFirstName());
                user.setLastName(doctor.getLastName());
                user.setContactNo(doctor.getContactNo());
                user.setEmail(doctor.getEmail());
                user.setAddress(doctor.getAddress());
                user.setSpecialization(doctor.getSpecialization());

                userRepository.save(user);

                return new ResponseEntity<>("Profile details updated successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Failed to update profile details", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("Something went wrong",HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateReceptionProfile(Long userId, UserDto reception) {
        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new UserDoesNotExistException());

            if(!user.equals(null)){
                user.setFirstName(reception.getFirstName());
                user.setLastName(reception.getLastName());
                user.setContactNo(reception.getContactNo());
                user.setEmail(reception.getEmail());
                user.setAddress(reception.getAddress());
//                user.setUsername(reception.getUsername());

                userRepository.save(user);

                return new ResponseEntity<>("Profile details updated successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Failed to update profile details", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("Something went wrong",HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public User getSingleUser() {
        try {
            var user = userRepository.findByEmail(jwtRequestFilter.getCurrentUser());
            //if (authenticationFilter.getCurrentUser() != null){

            if (user != null) {
                user.getUserId();
                user.getFirstName();
                user.getLastName();
                user.getContactNo();
                user.getEmail();
                user.getAddress();
                return user;
            } else {
                throw new UserDoesNotExistException();
            }
          //}

        } catch (Exception e) {
            e.printStackTrace();
        }
        throw new UserDoesNotExistException();
    }

    @Override
    public ResponseEntity<String> updateProfile(Long userId, UserDto user) {
        try{
            User users = userRepository.findById(userId).orElseThrow(() -> new UserDoesNotExistException());

            if(!users.equals(null)){
                users.setFirstName(user.getFirstName());
                users.setLastName(user.getLastName());
                users.setContactNo(user.getContactNo());
                users.setEmail(user.getEmail());
                users.setAddress(user.getAddress());
                userRepository.save(users);

                return new ResponseEntity<>("Profile details updated successfully", HttpStatus.OK);

            } else {
                return new ResponseEntity<>("Failed to update profile details", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception error){
            error.printStackTrace();
        }
        return  new ResponseEntity<>("Something went wrong",HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
