package com.cms.clinic.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "role", schema = "dbo")
@Data
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Long id;
    private String roleName;
}
