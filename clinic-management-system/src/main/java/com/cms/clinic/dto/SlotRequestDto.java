package com.cms.clinic.dto;

import lombok.Data;

@Data
public class SlotRequestDto {
    private Long doctorId;
    private int sessionDuration;
}
