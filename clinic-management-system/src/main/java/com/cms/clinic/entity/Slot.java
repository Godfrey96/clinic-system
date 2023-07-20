package com.cms.clinic.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalTime;
import java.util.Date;

@Entity
@Table(name = "slot", schema = "dbo")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Slot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long slotId;
    private LocalTime time;
    private Long patientId;
    private Long doctorId;
    @JsonFormat(pattern = "yyyy-MM-dd", shape = JsonFormat.Shape.STRING)
    private Date dateTime = new Date();
//    @OneToOne
//    @JoinColumn(name = "appointment_id")
//    private Appointment appointment;
}
