package com.cms.clinic.controller;

import com.cms.clinic.dto.CreateAppointmentRequest;
import com.cms.clinic.dto.UpdateAppointmentStatusDto;
import com.cms.clinic.entity.Appointment;
import com.cms.clinic.entity.Patient;
import com.cms.clinic.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/appointment")
@CrossOrigin("*")
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping("/create-appointment")
    public ResponseEntity<String> createAppointment(@RequestBody CreateAppointmentRequest createdAppointment){
        try {
            return appointmentService.createNewAppointment(createdAppointment);
        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/get-all-appointments")
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        try {
            return appointmentService.getAllAppointments();
        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/get-appointment/{appointmentId}")
    public ResponseEntity<Appointment> getAppointment(@PathVariable Long appointmentId){
        return new ResponseEntity<>(appointmentService.getAppointmentById(appointmentId), HttpStatus.OK);
    }

    @GetMapping("/appointments-for-doctor")
    public ResponseEntity<List<Appointment>> getAppointmentsForDoctor(){
        try {
            return appointmentService.getAllAppointmentsForDoctor();
        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/appointments-for-patient")
    public ResponseEntity<List<Appointment>> getAppointmentsForPatient(){
        try {
            return appointmentService.getAllAppointmentsForPatient();
        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PutMapping("/assign-appointments/{appointmentId}/slots/{slotId}/doctors/{doctorId}")
    public ResponseEntity<String> assignAppointmentSlotToDoctor(@PathVariable Long appointmentId, @PathVariable Long slotId, @PathVariable Long doctorId){
        try {
            return appointmentService.assignAppointmentSlotToDoctor(appointmentId, slotId, doctorId);
        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PutMapping("/update-appointment-status/{appointmentId}/status")
    public ResponseEntity<String> assignAppointmentStatusToDoctor(@PathVariable Long appointmentId){
        try {
            return appointmentService.assignAppointmentStatusToDoctor(appointmentId);
        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PutMapping("/cancel-appointment/{appointmentId}/cancel")
    public ResponseEntity<String> cancelAppointmentStatusForUser(@PathVariable Long appointmentId){
        try {
            return appointmentService.cancelAppointmentStatusForUser(appointmentId);
        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
