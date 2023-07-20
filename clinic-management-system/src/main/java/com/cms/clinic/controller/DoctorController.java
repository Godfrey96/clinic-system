package com.cms.clinic.controller;

import com.cms.clinic.dto.DoctorDto;
import com.cms.clinic.entity.Doctor;
import com.cms.clinic.entity.Patient;
import com.cms.clinic.entity.Slot;
import com.cms.clinic.jwt.JwtRequestFilter;
import com.cms.clinic.service.impl.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/doctor")
@CrossOrigin("*")
public class DoctorController {

    private final DoctorService doctorService;
    private final JwtRequestFilter jwtRequestFilter;

    @GetMapping("/{doctorId}/patients")
    public ResponseEntity<List<Patient>> getDoctorPatients(@PathVariable Long doctorId){
        List<Patient> patients = doctorService.getDoctorPatients(doctorId);
        return  new ResponseEntity<>(patients, HttpStatus.OK);
    }

//    @GetMapping("/patients-by-doctor/{doctorId}")
//    public ResponseEntity<List<Patient>> getDoctorPatientsById(@PathVariable Long doctorId){
//        List<Patient> getPatientsByDoctor = doctorService.getAssignedPatientsToDoctor(doctorId);
//        return new ResponseEntity<>(getPatientsByDoctor, HttpStatus.OK);
//    }

    @GetMapping("/patients-by-doctor")
    public ResponseEntity<List<Patient>> getDoctorPatientsByEmail(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        List<Patient> getPatientsByDoctor = doctorService.getAssignedPatientsToDoctor(email);
        return new ResponseEntity<>(getPatientsByDoctor, HttpStatus.OK);
    }

    @GetMapping("/get-doctor")
    public ResponseEntity<Doctor> getDoctor() {
        return new ResponseEntity<>(doctorService.getDoctor(), HttpStatus.OK);
    }
}
