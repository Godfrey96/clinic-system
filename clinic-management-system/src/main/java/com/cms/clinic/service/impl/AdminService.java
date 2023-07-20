package com.cms.clinic.service.impl;

import com.cms.clinic.dto.DoctorDto;
import com.cms.clinic.dto.PatientDto;
import com.cms.clinic.dto.RegisterRequestDto;
import com.cms.clinic.dto.UserDto;
import com.cms.clinic.entity.*;
import com.cms.clinic.exception.EmailAlreadyTakenException;
import com.cms.clinic.exception.UserDoesNotExistException;
import com.cms.clinic.jwt.JwtRequestFilter;
import com.cms.clinic.repositories.*;
import com.cms.clinic.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final DoctorRepository doctorRepository;
    private final JwtRequestFilter authenticationFilter;

    private String baseUrl = "http://localhost:4200/login/login";


    public List<User> viewAdmins() {
        return userRepository.findByRolesRoleName("ADMIN");
    }

    public List<Appointment> viewAppointments() {
        return appointmentRepository.findAll();
    }

    public List<Patient> viewPatients() {
        return patientRepository.findAll();
    }

    public List<User> viewReceptionists() {
        return userRepository.findByRolesRoleName("RECEPTION");
    }

    public List<User> viewDoctors() {
        return userRepository.findByRolesRoleName("DOCTOR");
    }


    //    Registration
    public User addNewReceptionist(RegisterRequestDto registerRequest) {
        log.info("Inside Register new receptionist method {} ", registerRequest);

        Role role = roleRepository.findByRoleName("RECEPTION").get();

        User receptionist = new User();

        receptionist.setFirstName(registerRequest.getFirstName());
        receptionist.setLastName(registerRequest.getLastName());
        receptionist.setEmail(registerRequest.getEmail());
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        receptionist.setRoles(roles);
        receptionist.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        receptionist.setEnabled("true");

        receptionist.setActivationToken(null);


        try {
            sendEmailToReception(receptionist.getEmail(), receptionist.getFirstName(), registerRequest.getPassword());
            return userRepository.save(receptionist);
        } catch (Exception e) {
            throw new EmailAlreadyTakenException();
        }
    }

    public User addNewDoctor(RegisterRequestDto registerRequest) {
        log.info("Inside Register new doctor method {} ", registerRequest);

        Role role = roleRepository.findByRoleName("DOCTOR").get();

        Doctor doctor = new Doctor();

        doctor.setFirstName(registerRequest.getFirstName());
        doctor.setLastName(registerRequest.getLastName());
        doctor.setEmail(registerRequest.getEmail());
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        doctor.setRoles(roles);
        doctor.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        doctor.setEnabled("true");

        doctor.setActivationToken(null);

        try {
            sendEmailToDoctor(doctor.getEmail(), doctor.getFirstName(), registerRequest.getPassword());
            return userRepository.save(doctor);
        } catch (Exception e) {
            e.printStackTrace();
//            throw new EmailAlreadyTakenException();
        }
        return null;
    }

    public User addNewAdmin(RegisterRequestDto registerRequest) {
        log.info("Inside Register new admin method {} ", registerRequest);

        Role role = roleRepository.findByRoleName("ADMIN").get();

        User admin = new User();

        admin.setFirstName(registerRequest.getFirstName());
        admin.setLastName(registerRequest.getLastName());
        admin.setEmail(registerRequest.getEmail());
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        admin.setRoles(roles);
        admin.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        admin.setEnabled("true");

        admin.setActivationToken(null);

        try {
            return userRepository.save(admin);
        } catch (Exception e) {
            e.printStackTrace();
//            throw new EmailAlreadyTakenException();
        }

        return null;
    }

    public ResponseEntity<String> deleteDoctor(Long userId) {
        try {
            Doctor doctor = doctorRepository.findById(userId).orElse(null);

            if (doctor.getRoles() != null) {
                doctor.setRoles(null);
            }
            if (!doctor.equals(null)) {
                doctorRepository.deleteById(userId);
                return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("User id does not exists", HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<String> deleteReception(Long userId) {
        try {
            User receptionist = userRepository.findById(userId).orElse(null);

            if (receptionist.getRoles() != null) {
                receptionist.setRoles(null);
            }
            if (!receptionist.equals(null)) {
                userRepository.deleteById(userId);
                return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("User id does not exists", HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<String> deletePatient(Long userId) {
        try {
            Patient patient = patientRepository.findById(userId).orElse(null);

            if (patient.getRoles() != null) {
                patient.setRoles(null);
            }
            if (!patient.equals(null)) {
                patientRepository.deleteById(userId);
                return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("User id does not exists", HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    //Update
    public User updateDoctor(UserDto doctorDto) {
        try {
            User existingDoctor = userRepository.findByEmail(doctorDto.getEmail());
            System.out.println("existingDoctor: " + existingDoctor.getEmail());

            if (!existingDoctor.equals(null)) {
                existingDoctor.setFirstName(doctorDto.getFirstName());
                existingDoctor.setLastName(doctorDto.getLastName());
                existingDoctor.setEmail(doctorDto.getEmail());
                existingDoctor.setContactNo(doctorDto.getContactNo());

                userRepository.save(existingDoctor);

                return existingDoctor;
            } else {
                throw new RuntimeException("Doctor does not exists");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return new Doctor();
    }

    public User updateReception(UserDto receptionDto) {
        try {
            User existingReception = userRepository.findByEmail(receptionDto.getEmail());

            if (!existingReception.equals(null)) {
                existingReception.setFirstName(receptionDto.getFirstName());
                existingReception.setLastName(receptionDto.getLastName());
                existingReception.setEmail(receptionDto.getEmail());
                existingReception.setContactNo(receptionDto.getContactNo());

                userRepository.save(existingReception);

                return existingReception;
            } else {
                throw new RuntimeException("Receptionist does not exists");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return new User();
    }

    public Patient updatePatient(PatientDto patientDto) {
        try {
            Patient existingPatient = patientRepository.findByEmail(patientDto.getEmail());

            if (!existingPatient.equals(null)) {
                existingPatient.setFirstName(patientDto.getFirstName());
                existingPatient.setLastName(patientDto.getLastName());
                existingPatient.setEmail(patientDto.getEmail());
                existingPatient.setContactNo(patientDto.getContactNo());

                patientRepository.save(existingPatient);

                return existingPatient;
            } else {
                throw new RuntimeException("Patient does not exists");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return new Patient();
    }


    public Appointment updateAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    //single user
    public Patient getSinglePatient() {
        try {
            var patient = patientRepository.findByEmail(authenticationFilter.getCurrentUser());
            if (patient != null) {
                patient.getUserId();
                patient.getFirstName();
                patient.getLastName();
                patient.getContactNo();
                patient.getEmail();
                patient.getAddress();
                return patient;
            } else {
                throw new UserDoesNotExistException();
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        throw new UserDoesNotExistException();
    }

    public Doctor getSingleDoctor() {
        try {
            var doctor = doctorRepository.findByEmail(authenticationFilter.getCurrentUser());
            if (doctor != null) {
                doctor.getUserId();
                doctor.getFirstName();
                doctor.getLastName();
                doctor.getContactNo();
                doctor.getEmail();
                doctor.getAddress();
                return doctor;
            } else {
                throw new UserDoesNotExistException();
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        throw new UserDoesNotExistException();
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserDoesNotExistException());
    }


    private String generateActivationToken() {
        return UUID.randomUUID().toString();
    }

    private void sendEmailToDoctor(String doctorEmail, String doctorName, String doctorPassword) {
        try {
            emailService.sendSimpleEmail(doctorEmail,
                    "Dear Dr. " + doctorName + ",\n\n"
                            + "Welcome to our company! We are excited to have you as a new member of our team.\n\n"
                            + "Your login credentials are as follows:\n"
                            + "Email: " + doctorEmail + "\n"
                            + "Password: " + doctorPassword + "\n\n"
                            + "Please click on the following link to login to our system:\n"
                            + baseUrl + "\n\n"
                            + "We look forward to working with you and making great strides together!\n\n"
                            + "Best regards,\n"
                            + "Clinic Management System",
                    "Welcome to Our Company");
        } catch (Exception e) {
            throw new RuntimeException("Error while sending the activation link");
        }
    }

    private void sendEmailToReception(String receptionEmail, String receptionName, String receptionPassword) {
        try {
            emailService.sendSimpleEmail(receptionEmail,
                    "Dear " + receptionName + ",\n\n"
                            + "Welcome to our company! We are excited to have you as a new member of our team.\n\n"
                            + "Your login credentials are as follows:\n"
                            + "Email: " + receptionEmail + "\n"
                            + "Password: " + receptionPassword + "\n\n"
                            + "Please click on the following link to login to our system:\n"
                            + baseUrl + "\n\n"
                            + "We look forward to working with you and making great strides together!\n\n"
                            + "Best regards,\n"
                            + "Clinic Management System",
                    "Welcome to Our Company");
        } catch (Exception e) {
            throw new RuntimeException("Error while sending the activation link");
        }
    }

}

