package com.cms.clinic.service;

import com.cms.clinic.entity.Slot;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface SlotService {
    ResponseEntity<String> createSlots(Long doctorId, int sessionDuration);
    List<Slot> getAvailableSlots();
    List<Slot> getSlotsByDoctorId(Long doctorId);
    Slot getSlotById(Long slotId);
    ResponseEntity<String> assignSlotToPatient(Long slotId, Long appointmentId, Long patientId);
}
