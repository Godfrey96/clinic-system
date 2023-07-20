package com.cms.clinic;

//import com.cms.clinic.entity.Admin;
import com.cms.clinic.entity.Role;
//import com.cms.clinic.repositories.AdminRepository;
import com.cms.clinic.repositories.RoleRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class ClinicApplication {

//	public ClinicApplication(AdminRepository adminRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder){
//
//		Role roleAdmin = roleRepository.findByRoleName("ADMIN").get();
//
//		Admin admin = new Admin();
//		admin.setFirstName("Admin");
//		admin.setLastName("Admin");
//		admin.setUsername("admin123");
//		admin.setContactNo("0720461090");
//		admin.setEmail("admin@gmail.com");
//		admin.setPassword(passwordEncoder.encode("123456789"));
//		admin.setAddress("Tsakane");
//
//		Set<Role> adminRoles = new HashSet<>();
//		adminRoles.add(roleAdmin);
//		admin.setRoles(adminRoles);
//
//		admin.setEnabled("true");
//		admin.setActivationToken("null");
//
//		adminRepository.save(admin);
//	}

	public static void main(String[] args) {
		SpringApplication.run(ClinicApplication.class, args);
	}

}
