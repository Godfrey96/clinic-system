package com.cms.clinic.controller;

import com.cms.clinic.dto.PatientSlotDto;
import com.cms.clinic.dto.SlotRequestDto;
import com.cms.clinic.entity.Slot;
import com.cms.clinic.service.SlotService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/slot")
@CrossOrigin("*")
@RequiredArgsConstructor
public class SlotController {

    private final SlotService slotService;

    @PostMapping("/create-slot")
    public ResponseEntity<String> createSlot(@RequestBody SlotRequestDto slotRequestDto){
        try {
            return slotService.createSlots(slotRequestDto.getDoctorId(), slotRequestDto.getSessionDuration());
        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/available-slots")
    public ResponseEntity<List<Slot>> getAvailableSlots(){
        List<Slot> availableSlots = slotService.getAvailableSlots();
        return ResponseEntity.ok(availableSlots);
    }

    @GetMapping("/slots/{doctorId}")
    public ResponseEntity<List<Slot>> getAvailableSlotByDoctorId(@PathVariable Long doctorId){
        List<Slot> availableSlotsByDoctor = slotService.getSlotsByDoctorId(doctorId);
        return new ResponseEntity<>(availableSlotsByDoctor, HttpStatus.OK);
    }

    @PostMapping("/assign-slot/{slotId}/assign")
    public ResponseEntity<String> assignSlotToPatient(@PathVariable Long slotId, @PathVariable Long appointmentId, @RequestBody PatientSlotDto patientSlotDto){
        try {
            return slotService.assignSlotToPatient(slotId, appointmentId, patientSlotDto.getPatientId());
        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
