package com.cms.clinic.controller;

import com.cms.clinic.dto.PatientDto;
import com.cms.clinic.dto.RegisterRequestDto;
import com.cms.clinic.entity.Patient;
import com.cms.clinic.entity.User;
import com.cms.clinic.exception.AccountNotActivatedException;
import com.cms.clinic.exception.EmailAlreadyTakenException;
import com.cms.clinic.service.PatientService;
import com.cms.clinic.service.impl.PatientServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/patient")
@CrossOrigin("*")
public class PatientController {

    private final PatientService patientService;
    private final PatientServiceImpl patientServiceImpl;

    @ExceptionHandler({EmailAlreadyTakenException.class})
    public ResponseEntity<String> handleAlreadyTaken() {
        return new ResponseEntity<>("The email provided is already taken", HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequestDto request) {
        try {
            return patientService.addNewPatient(request);
        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/activate")
    public ResponseEntity<String> activateUser(@RequestParam("token") String activationToken) {
        try {
            patientService.activateUser(activationToken);
            String activationLink = "http://localhost:4200/login/login";
            String activationMessage = "Account activated successfully.Click here to: <a href=\"" + activationLink + "\">Login</a>";
            return new ResponseEntity<>(activationMessage, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid activation token.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to activate account.");
        }
    }

    @PutMapping("/update-patient/{userId}")
    public ResponseEntity<String> updateProfile(@PathVariable Long userId, @RequestBody PatientDto patient){

        try{
            return patientService.updatePatientProfile(userId, patient);
        } catch (Exception error){
            error.printStackTrace();
        }
        return new ResponseEntity<>("Something went wrong while updating patient profile", HttpStatus.INTERNAL_SERVER_ERROR);
    }

//    @GetMapping("/doctors/{doctorId}/patients")
//    public List<Patient> getPatientsByDoctor(@PathVariable("doctorId") Long doctorId) {
//        return patientService.getPatientsByDoctor(doctorId);
//    }
}
