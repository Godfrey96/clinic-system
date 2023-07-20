package com.cms.clinic.service.impl;

import com.cms.clinic.dto.CreateAppointmentRequest;
import com.cms.clinic.entity.Appointment;
import com.cms.clinic.entity.Doctor;
import com.cms.clinic.entity.Patient;
import com.cms.clinic.entity.Slot;
import com.cms.clinic.exception.UserDoesNotExistException;
import com.cms.clinic.jwt.JwtRequestFilter;
import com.cms.clinic.repositories.*;
import com.cms.clinic.service.AppointmentService;
import com.cms.clinic.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final SlotRepository slotRepository;
    private final UserRepository userRepository;
    private final JwtRequestFilter jwtRequestFilter;
    private final EmailService emailService;

    @Override
    public ResponseEntity<String> createNewAppointment(CreateAppointmentRequest appointmentRequest) {
        try {

            Patient patient = patientRepository.findByEmail(jwtRequestFilter.getCurrentUser());

            if (!patient.equals(null)) {
                Appointment newAppointment = new Appointment();
                newAppointment.setProblem(appointmentRequest.getProblem());
                newAppointment.setAppointmentBookingDate(appointmentRequest.getAppointmentBookingDate());
                newAppointment.setPatient(patient);
                newAppointment.setStatus("Pending");

                appointmentRepository.save(newAppointment);

                return new ResponseEntity<>("Appointment booked successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Failed to book an appointment", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        try {
            return new ResponseEntity<>(appointmentRepository.findAll(), HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<Appointment>> getAllAppointmentsForDoctor() {
        try {
            Doctor doctor = doctorRepository.findByEmail(jwtRequestFilter.getCurrentUser());

            return new ResponseEntity<>(appointmentRepository.findByDoctor(doctor), HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<Appointment>> getAllAppointmentsForPatient() {
        try {

            Patient patient = patientRepository.findByEmail(jwtRequestFilter.getCurrentUser());

            return new ResponseEntity<>(appointmentRepository.findByPatient(patient), HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @Override
    public Appointment getAppointmentById(Long appointmentId) {
        return appointmentRepository.findById(appointmentId).orElse(null);
    }

    @Override
    public ResponseEntity<String> assignAppointmentSlotToDoctor(Long appointmentId, Long slotId, Long doctorId) {
        log.info("Inside assignAppointmentToDoctor {} ", appointmentId + " - " + slotId);
        try {

            Appointment appointment = getAppointmentById(appointmentId);
            Slot slot = slotRepository.findById(slotId).orElse(null);
            Doctor doctor = doctorRepository.findById(doctorId).orElse(null);
            Patient patient = patientRepository.findById(appointment.getPatient().getUserId()).orElse(null);

            if (appointment != null && slot != null){
                //            slot.setPatientId(assignSlotRequest.getPatientId());
                appointment.setSlot(slot);
                appointment.setStatus("Approved");
                appointment.setDoctor(doctor);
                System.out.println("appointment: " + appointment);

                slot.setPatientId(patient.getUserId());
                //slot.setAppointment(appointment);
                System.out.println("slot: " + slot);
                slotRepository.save(slot);
                appointmentRepository.save(appointment);

                sendEmailToDoctor(doctor, patient, appointment, slot);
                sendEmailToPatient(patient, doctor, appointment, slot);

                return new ResponseEntity<>("Slot assigned to the appointment successfully!", HttpStatus.OK);
            } else {
                throw new RuntimeException("Slot already booked");
            }
        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> assignAppointmentStatusToDoctor(Long appointmentId) {
        try{
            Appointment appointment = getAppointmentById(appointmentId);

            if (appointment != null){
                appointment.setStatus("Done");

                appointmentRepository.save(appointment);

                return new ResponseEntity<>("Status appointment updated successfully!", HttpStatus.OK);
            } else {
                throw new RuntimeException("Failed to update status");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> cancelAppointmentStatusForUser(Long appointmentId) {
        try{
            Appointment appointment = getAppointmentById(appointmentId);

            if (appointment != null){
                appointment.setStatus("Cancel");

                appointmentRepository.save(appointment);

                return new ResponseEntity<>("Appointment cancelled!", HttpStatus.OK);
            } else {
                throw new RuntimeException("Failed to cancel appointment");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private void sendEmailToPatient(Patient patient, Doctor doctor, Appointment appointment, Slot slot) {
        try {
            emailService.sendSimpleEmail(patient.getEmail(),
                    "Dear " + patient.getFirstName() + "\n\n"
                            + "Your appointment has been approved and  assigned to Dr. " + doctor.getFirstName() + ".\n\n"
                            + "The details of the appointment are as follows: " + "\n\n"
                            + "Doctor: " + doctor.getFirstName() + "\n"
                            + "Date: " + appointment.getAppointmentBookingDate() + "\n"
                            + "Time: " + slot.getTime() + "\n\n"
                            + "Thank you for choosing our clinic.\n"
                            + "Regards,\n"
                            + "Clinic Management System",
                    "Appointment Assigned");
        } catch (Exception e) {
            throw new RuntimeException("Error while sendi" +
                    "ng an email");
        }
    }

    private void sendEmailToDoctor(Doctor doctor, Patient patient, Appointment appointment, Slot slot) {
        try {
            emailService.sendSimpleEmail(doctor.getEmail(),
                    "Dear Dr. " + doctor.getFirstName() + ",\n\n"
                            + "This is a reminder that you have an upcoming appointment with " + patient.getFirstName() + ".\n"
                            + "The details of the appointment are as follows: " + "\n\n"
                            + "Patient: " + patient.getFirstName() + "\n"
                            + "Date: " + appointment.getAppointmentBookingDate() + "\n"
                            + "Time: " + slot.getTime() + "\n\n"
                            + "Please ensure that you are prepared for the appointment and available to provide the necessary care and attention to the patient.\n\n"
                            + "Thank you for your dedication and commitment to providing quality healthcare.\n\n"
                            + "Best regards,\n"
                            + "Clinic Management System",
                    "Appointment Reminder");
        } catch (Exception e) {
            throw new RuntimeException("Error while sendi" +
                    "ng an email");
        }
    }
}
