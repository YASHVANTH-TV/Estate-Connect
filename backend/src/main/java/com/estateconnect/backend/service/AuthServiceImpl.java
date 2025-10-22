package com.estateconnect.backend.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.estateconnect.backend.config.JwtUtil;
import com.estateconnect.backend.config.UserPrincipal;
import com.estateconnect.backend.exception.UserAlreadyExistsException;
import com.estateconnect.backend.model.User;
import com.estateconnect.backend.model.dto.LoginRequest;
import com.estateconnect.backend.model.dto.LoginResponse;
import com.estateconnect.backend.model.dto.RegisterRequest;
import com.estateconnect.backend.model.dto.RegisterResponse;
import com.estateconnect.backend.repository.UserRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepo userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @Override
    public RegisterResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("Account with this Email already exists.");
        }

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setMobileNumber(request.getMobileNumber());
        user.setPassword(new BCryptPasswordEncoder().encode(request.getPassword()));
        user.setRole(request.getRole());

        RegisterResponse response = new RegisterResponse();
        response.setFirstName(request.getFirstName());
        response.setRole(request.getRole());

        userRepository.save(user);
        return response;
    }

    @Override
    public LoginResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        String token = jwtUtil.generateToken(userPrincipal.getUsername());

        LoginResponse response = new LoginResponse();
        response.setUserId(userPrincipal.getUserId());
        response.setToken(token);
        response.setFirstName(userPrincipal.getUser().getFirstName());
        response.setRole(userPrincipal.getRole());

        return response;
    }
}