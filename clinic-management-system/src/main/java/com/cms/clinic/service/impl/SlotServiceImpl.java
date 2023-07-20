package com.cms.clinic.service.impl;

import com.cms.clinic.entity.Appointment;
import com.cms.clinic.entity.Slot;
import com.cms.clinic.repositories.AppointmentRepository;
import com.cms.clinic.repositories.SlotRepository;
import com.cms.clinic.service.SlotService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SlotServiceImpl implements SlotService {

    private final SlotRepository slotRepository;
    private final AppointmentRepository appointmentRepository;

    @Override
    public ResponseEntity<String> createSlots(Long doctorId, int sessionDuration) {
        try {
            int slotsPerHour = 60 / sessionDuration;

            LocalTime startTime = LocalTime.of(10, 0);
            LocalTime endTime = LocalTime.of(11, 0);

            Duration durationBetweenSlots = Duration.between(startTime, endTime).dividedBy(slotsPerHour);

            for (int i = 0; i < slotsPerHour; i++){
                Slot slot = new Slot();
                slot.setDoctorId(doctorId);
                slot.setTime(startTime.plus(durationBetweenSlots.multipliedBy(i)));
                slotRepository.save(slot);
            }
            return new ResponseEntity<>("Slot added successfully", HttpStatus.OK);

        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public List<Slot> getAvailableSlots() {
        return slotRepository.findByPatientIdIsNull();
    }

    @Override
    public List<Slot> getSlotsByDoctorId(Long doctorId) {
        List<Slot> doctorSlots = new ArrayList<>();

        for (Slot slot : getAvailableSlots()) {
            if (slot.getDoctorId() == doctorId && slot.getPatientId() == null){
                doctorSlots.add(slot);
            }
        }
        return doctorSlots;
    }

    @Override
    public Slot getSlotById(Long slotId) {
        return slotRepository.findById(slotId).orElse(null);
    }

    @Override
    public ResponseEntity<String> assignSlotToPatient(Long slotId, Long appointmentId, Long patientId) {
        try {
            Slot slot = slotRepository.findById(slotId)
                    .orElseThrow(() -> new RuntimeException("Slot not found"));

            Appointment appointment = appointmentRepository.findById(appointmentId)
                    .orElse(null);

//            if (slot.getAppointment() != null){
//                throw new RuntimeException("Slot already booked");
//            }

//            appointment.setSlot(slot);

            slot.setPatientId(patientId);
//            slot.setAppointment(appointment);

            slotRepository.save(slot);
//            appointmentRepository.save(appointment);

            return new ResponseEntity<>("Patient assigned to slot successfully", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
