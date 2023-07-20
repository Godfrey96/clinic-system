package com.cms.clinic.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateAppointmentRequest {
    private LocalDateTime appointmentBookingDate;
    private String problem;
    private Long patientId;
}
