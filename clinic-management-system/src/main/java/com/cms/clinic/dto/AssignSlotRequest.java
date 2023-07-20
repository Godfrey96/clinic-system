package com.cms.clinic.dto;

import lombok.Data;

@Data
public class AssignSlotRequest {
    private Long appointmentId;
    private Long doctorId;
    private Long slotId;
    private String status;
}
