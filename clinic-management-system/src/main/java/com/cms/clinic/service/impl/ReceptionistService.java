package com.cms.clinic.service.impl;

import com.cms.clinic.entity.Appointment;
import com.cms.clinic.entity.Doctor;
import com.cms.clinic.entity.Patient;
//import com.cms.clinic.entity.Receptionist;
import com.cms.clinic.entity.User;
import com.cms.clinic.repositories.AppointmentRepository;
import com.cms.clinic.repositories.DoctorRepository;
import com.cms.clinic.repositories.PatientRepository;
//import com.cms.clinic.repositories.ReceptionistRepository;
import com.cms.clinic.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReceptionistService {

//    private final ReceptionistRepository receptionistRepository;
    private final AppointmentRepository appointmentRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final UserRepository userRepository;

    //View all appointments
    public List<Appointment> viewAppointments(){
        return appointmentRepository.findAll();
    }

    public List<User> viewDoctors() {
        return userRepository.findByRolesRoleName("DOCTOR");
//        return doctorRepository.findAll();
    }

    public List<Patient> viewPatients() {
        return patientRepository.findAll();
    }

    //View all receptionists
    public List<User> viewReceptionists(){
        return userRepository.findByRolesRoleName("RECEPTION");
    }

    //Add new receptionist
//    public Receptionist addReceptionist(Receptionist receptionist){
//        return receptionistRepository.save(receptionist);
//    }

//    Get Receptionist By ID
    public Optional<User> getReceptionistById(Long id){
        return this.userRepository.findById(id);
    }

    //Update Receptionist
    public Optional<User> updateReceptionist(User receptionist){
        Optional<User> oldRecep = null;

        Optional<Optional<User>> optionalReceptionist = Optional.ofNullable(userRepository.findById(receptionist.getUserId()));

        return oldRecep;
    }

    //Update Appointment
//    public Optional<Appointment> updateAppointment(Appointment appointment){
//        Optional<Appointment> oldApp = null;
//
//        Optional<Optional<Appointment>> optionalReceptionist = Optional.ofNullable(appointmentRepository.findById(appointment.getAppointmentId()));
//
//        return oldApp;
//    }

    //Delete Receptionist
//    public String deleteReceptionistById(Long id){
//        receptionistRepository.deleteById(id);
//        return "Receptionist Deleted";
//    }
}
