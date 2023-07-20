package com.cms.clinic.service;

import com.cms.clinic.dto.CreateAppointmentRequest;
import com.cms.clinic.entity.Appointment;
import com.cms.clinic.entity.Doctor;
import com.cms.clinic.entity.Patient;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AppointmentService {
    ResponseEntity<String> createNewAppointment(CreateAppointmentRequest appointmentRequest);
    ResponseEntity<List<Appointment>> getAllAppointments();
    ResponseEntity<List<Appointment>> getAllAppointmentsForDoctor();
    ResponseEntity<List<Appointment>> getAllAppointmentsForPatient();
    Appointment getAppointmentById(Long appointmentId);
    ResponseEntity<String> assignAppointmentSlotToDoctor(Long appointmentId,  Long slotId, Long doctorId);
    ResponseEntity<String> assignAppointmentStatusToDoctor(Long appointmentId);
    ResponseEntity<String> cancelAppointmentStatusForUser(Long appointmentId);
}
