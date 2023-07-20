package com.cms.clinic.service.impl;


import com.cms.clinic.dto.DoctorDto;
import com.cms.clinic.entity.Doctor;
import com.cms.clinic.entity.Patient;
import com.cms.clinic.entity.Slot;
import com.cms.clinic.exception.UserDoesNotExistException;
import com.cms.clinic.jwt.JwtRequestFilter;
import com.cms.clinic.repositories.DoctorRepository;
import com.cms.clinic.repositories.PatientRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class DoctorService {
   private final DoctorRepository doctorRepository;
   private  final PatientRepository patientRepository;
    private final JwtRequestFilter jwtRequestFilter;

   public List<Patient> getDoctorPatients(Long doctorId){
       log.info("Inside getDoctorPatients{} ", doctorId);
       Doctor doctor = doctorRepository.findById(doctorId)
               .orElseThrow(() -> new IllegalArgumentException("Doctor id not found" + doctorId ));
       return  patientRepository.findByDoctor(doctor);
   }

//    public List<Patient> getAssignedPatientsToDoctor(Long doctorId) {
//        Doctor doctor = doctorRepository.findById(doctorId)
//                .orElseThrow(() -> new UserDoesNotExistException());
//
//        return doctor.getPatients();
//    }

//    public List<Patient> getAssignedPatientsToDoctor(Long doctorId) {
//        return doctorRepository.findPatientsByDoctorId(doctorId);
//    }

    public List<Patient> getAssignedPatientsToDoctor(String email) {
//        var doctor = doctorRepository.findByEmail(email);

        return doctorRepository.findPatientsByDoctorEmail(email);
    }

    public Doctor getDoctor() {
        try {
            var doctor = doctorRepository.findByEmail(jwtRequestFilter.getCurrentUser());

            if (doctor != null){
                doctor.getUserId();
                doctor.getFirstName();
                doctor.getLastName();
                doctor.getContactNo();
                doctor.getSpecialization();
                doctor.getAddress();

                return doctor;
            } else {
                throw new UserDoesNotExistException();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        throw new UserDoesNotExistException();
    }


}
