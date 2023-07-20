package com.cms.clinic.controller;

import com.cms.clinic.dto.*;
import com.cms.clinic.entity.Doctor;
import com.cms.clinic.entity.Patient;
import com.cms.clinic.entity.User;
import com.cms.clinic.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin("*")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody PasswordChangeDto passwordChangeDto){
        try {
            return userService.changePassword(passwordChangeDto);
        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PutMapping("/update-profile/{userId}")
    public ResponseEntity<String> updateAdminProfile(@PathVariable Long userId, @RequestBody UserDto updateUser) {
        try {
            return userService.updateAdminProfile(userId, updateUser);
        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PutMapping("/update-patient-profile/{userId}")
    public ResponseEntity<String> updatePatientProfile(@PathVariable Long userId, @RequestBody PatientDto updateUser) {
        try {
            return userService.updatePatientProfile(userId, updateUser);
        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PutMapping("/update-doctor-profile/{userId}")
    public ResponseEntity<String> updateDoctorProfile(@PathVariable Long userId, @RequestBody DoctorDto updateUser) {
        try {
            return userService.updateDoctorProfile(userId, updateUser);
        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PutMapping("/update-reception-profile/{userId}")
    public ResponseEntity<String> updateReceptionProfile(@PathVariable Long userId, @RequestBody UserDto updateUser) {
        try {
            return userService.updateReceptionProfile(userId, updateUser);
        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/get-user")
    public ResponseEntity<User> getSinglePatient(){
        return new ResponseEntity<>(userService.getSingleUser(), HttpStatus.OK);
    }

    @PutMapping("/update-user/{userId}")
    public ResponseEntity<String> updateProfile(@PathVariable Long userId, @RequestBody UserDto user){

        try{
            return userService.updateProfile(userId, user);
        } catch (Exception error){
            error.printStackTrace();
        }
        return new ResponseEntity<>("Something went wrong while updating patient profile", HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
