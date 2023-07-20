package com.cms.clinic.service.impl;

import com.cms.clinic.exception.UserDoesNotExistException;
import com.cms.clinic.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

//    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    private com.cms.clinic.entity.User userDetail;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        userDetail = userRepository.findByEmail(username);

        if (!Objects.isNull(userDetail)) {
            return new User(
                    userDetail.getEmail(),
                    userDetail.getPassword(),
                    getAuthorities(userDetail));
        } else {
            throw new UserDoesNotExistException();
        }
    }

    public com.cms.clinic.entity.User getUserDetail() {
        return userDetail;
    }

    public Optional<User> getCurrentUser(){
        User principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return Optional.of(principal);
    }

    private Set getAuthorities(com.cms.clinic.entity.User user) {
        Set authorities = new HashSet();

        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getRoleName()));
        });

        return authorities;
    }
}
