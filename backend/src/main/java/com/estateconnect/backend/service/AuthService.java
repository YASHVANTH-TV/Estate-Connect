package com.estateconnect.backend.service;

import com.estateconnect.backend.model.dto.LoginRequest;
import com.estateconnect.backend.model.dto.LoginResponse;
import com.estateconnect.backend.model.dto.RegisterRequest;
import com.estateconnect.backend.model.dto.RegisterResponse;

public interface AuthService {
    RegisterResponse register(RegisterRequest request);

    LoginResponse login(LoginRequest request);
}