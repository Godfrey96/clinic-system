package com.cms.clinic.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PatientDto {
    @NotNull
    private String firstName;
    @NotNull
    private String lastName;
    private String contactNo;

    @Column(unique = true)
    private String email;;
    private String address;
    private String bloodGroup;
}
