package com.cms.clinic.repositories;

import com.cms.clinic.entity.Slot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SlotRepository extends JpaRepository<Slot, Long> {
    List<Slot> findByPatientIdIsNull();
    List<Slot> findByDoctorId(Long doctorId);
}
