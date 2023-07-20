package com.cms.clinic.init;

import com.cms.clinic.entity.Role;
import com.cms.clinic.entity.User;
import com.cms.clinic.repositories.RoleRepository;
import com.cms.clinic.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class ApplicationStartRunner implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    public void run(String... args) throws Exception {

//        Role role = roleRepository.findByRoleName("DOCTOR").get();
//
//        User doctor = new User();
//
//        doctor.setFirstName("Doctor1");
//        doctor.setLastName("Doctor2");
//        doctor.setEmail("doctor1@gmail.com");
//        Set<Role> roles = new HashSet<>();
//        roles.add(role);
//        doctor.setRoles(roles);
//        doctor.setPassword(passwordEncoder.encode("1233456789"));
//        doctor.setEnabled("true");
//
//        doctor.setActivationToken(null);
//
//        userRepository.save(doctor);

//        Role roleAdmin = new Role();
//        roleAdmin.setId(1L);
//        roleAdmin.setRoleName("ADMIN");
//        roleRepository.save(roleAdmin);
//
//        Role roleDoctor = new Role();
//        roleDoctor.setId(2L);
//        roleDoctor.setRoleName("DOCTOR");
//        roleRepository.save(roleDoctor);
//
//        Role roleReception = new Role();
//        roleReception.setId(3L);
//        roleReception.setRoleName("RECEPTION");
//        roleRepository.save(roleReception);
//
//        Role rolePatient = new Role();
//        rolePatient.setId(4L);
//        rolePatient.setRoleName("PATIENT");
//        roleRepository.save(rolePatient);

    }
}
