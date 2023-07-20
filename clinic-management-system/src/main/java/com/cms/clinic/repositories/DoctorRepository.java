package com.cms.clinic.repositories;

import com.cms.clinic.entity.Doctor;
import com.cms.clinic.entity.Patient;
import com.cms.clinic.entity.Slot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DoctorRepository extends JpaRepository<Doctor,Long>{
  Doctor findByEmail(String email);
//  List<Patient> findByDoctorId(Long doctorId);

//  @Query("SELECT a.patient FROM Appointment a WHERE a.doctor.id = :doctorId")
//  List<Patient> findPatientsByDoctorId(@Param("doctorId") Long doctorId);

  @Query("SELECT a.patient FROM Appointment a WHERE a.doctor.email = :email")
  List<Patient> findPatientsByDoctorEmail(@Param("email") String email);
}
