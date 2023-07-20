package com.cms.clinic.controller;


import com.cms.clinic.dto.DoctorDto;
import com.cms.clinic.dto.PatientDto;
import com.cms.clinic.dto.RegisterRequestDto;
import com.cms.clinic.dto.UserDto;
import com.cms.clinic.entity.*;
import com.cms.clinic.service.impl.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin")
@CrossOrigin("*")
public class AdminController {

    private final AdminService adminService;
    private final PatientServiceImpl patientServiceImp;
    private final ReceptionistService receptionistService;
    private final DoctorService doctorService;
    private final UserServiceImpl userServiceImpl;

    //Viewing
    @GetMapping("/viewAppointments")
    public List<Appointment> getAllAppointments() {
        return adminService.viewAppointments();
    }

    @GetMapping("/viewAdmins")
    public List<User> getAllAdmin() {
        return adminService.viewAdmins();
    }

    @GetMapping("/viewPatients")
    public List<Patient> getAllPatient() {
        return adminService.viewPatients();
    }

    @GetMapping("/viewReceptionists")
    public List<User> getAllReceptionist() {
        return adminService.viewReceptionists();
    }

    @GetMapping("/get-patient")
    public ResponseEntity<Patient> getSinglePatient() {
        return new ResponseEntity<>(adminService.getSinglePatient(), HttpStatus.OK);
    }


//    @GetMapping("/viewDoctor")
//    public List<Doctor> getAllDoctors() {
//        return adminService.viewDoctors();
//    }

    @GetMapping("/viewDoctor")
    public List<User> getAllDoctors() {
        return adminService.viewDoctors();
    }


    @PostMapping("/addNewReceptionist")
    public ResponseEntity<User> addReceptionist(@RequestBody RegisterRequestDto request) {
        return new ResponseEntity<>(adminService.addNewReceptionist(request), HttpStatus.CREATED);
    }


    @PostMapping("/addNewDoctor")
    public ResponseEntity<User> addDoctor(@RequestBody RegisterRequestDto request) {
        return new ResponseEntity<>(adminService.addNewDoctor(request), HttpStatus.CREATED);
    }

    @PostMapping("/addNewAdmin")
    public ResponseEntity<User> addAdmin(@RequestBody RegisterRequestDto request) {
        return new ResponseEntity<>(adminService.addNewAdmin(request), HttpStatus.CREATED);
    }

    @PutMapping("/updateDoctor")
    public ResponseEntity<User> updateDoctor(@RequestBody UserDto doctorDto) {
        return new ResponseEntity<>(adminService.updateDoctor(doctorDto), HttpStatus.OK);
    }
    @PutMapping("/update-reception")
    public ResponseEntity<User> updateReception(@RequestBody UserDto receptionDto) {
        return new ResponseEntity<>(adminService.updateReception(receptionDto), HttpStatus.OK);
    }

    @PutMapping("/update-patient")
    public ResponseEntity<Patient> updatePatient(@RequestBody PatientDto patientDto) {
        return new ResponseEntity<>(adminService.updatePatient(patientDto), HttpStatus.OK);
    }

    @DeleteMapping("/delete-doctor/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId) {
        try {
            return adminService.deleteDoctor(userId);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @DeleteMapping("/delete-reception/{userId}")
    public ResponseEntity<String> deleteReception(@PathVariable Long userId) {
        try {
            return adminService.deleteReception(userId);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @DeleteMapping("/delete-patient/{userId}")
    public ResponseEntity<String> deletePatient(@PathVariable Long userId) {
        try {
            return adminService.deletePatient(userId);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PutMapping("/updateAppointment")
    public Appointment updateAppointment(@RequestBody Appointment appointment) {
        return adminService.updateAppointment(appointment);
    }


    @GetMapping("/get/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable("userId") Long userId) {
        return new ResponseEntity<>(adminService.getUserById(userId), HttpStatus.OK);
    }

}

