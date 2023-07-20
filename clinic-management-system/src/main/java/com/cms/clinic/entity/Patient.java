package com.cms.clinic.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.*;

@Entity
@Table(name = "patients", schema = "dbo")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Patient extends User {

    private String bloodGroup;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

}
