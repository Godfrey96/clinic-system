package com.cms.clinic.service;

import com.cms.clinic.dto.AuthenticationRequestDto;
import com.cms.clinic.dto.AuthenticationResponse;

public interface AuthService {

    AuthenticationResponse login(AuthenticationRequestDto authenticationRequestDto);
}
