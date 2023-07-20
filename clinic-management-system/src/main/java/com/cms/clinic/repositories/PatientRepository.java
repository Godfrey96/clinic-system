package com.cms.clinic.repositories;

import com.cms.clinic.entity.Doctor;
import com.cms.clinic.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PatientRepository extends JpaRepository<Patient, Long> {

    Patient findByEmail(String email);

    List<Patient> findByDoctor(Doctor doctor);
//    List<Patient> findByDoctorId(Long doctorId);

    Patient findByActivationToken(String activationToken);
}
