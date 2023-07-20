package com.cms.clinic.dto;

import lombok.Data;

@Data
public class UpdateAppointmentStatusDto {
    private Long doctorId;
    private Long patientId;
    private Long slotId;
    private String status;
}
