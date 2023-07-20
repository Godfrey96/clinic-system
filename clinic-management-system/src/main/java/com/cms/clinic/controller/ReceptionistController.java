package com.cms.clinic.controller;

import com.cms.clinic.entity.Appointment;
import com.cms.clinic.entity.Doctor;
import com.cms.clinic.entity.Patient;
import com.cms.clinic.entity.User;
import com.cms.clinic.service.impl.ReceptionistService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/receptionist")
@CrossOrigin("*")
public class ReceptionistController {

    private final ReceptionistService receptionistService;

    //Get all appointments
    @GetMapping("/viewappointments")
    public List<Appointment> getAllAppointments() {
        return receptionistService.viewAppointments();
    }

    @GetMapping("/get-all-patients")
    public List<Patient> getAllPatient() {
        return receptionistService.viewPatients();
    }

    @GetMapping("/get-all-doctors")
    public List<User> getAllDoctors() {
        return receptionistService.viewDoctors();
    }


    //get receptionist by id
    @GetMapping("/getreceptionist/{id}")
    public Optional<User> getReceptionistById(@PathVariable Long id) {
        return this.receptionistService.getReceptionistById(id);
    }

    //update receptionist details
    @PutMapping("/updatereceptionist")
    public Optional<User> updateReceptionist(@RequestBody User receptionist) {
        return receptionistService.updateReceptionist(receptionist);
    }
}
