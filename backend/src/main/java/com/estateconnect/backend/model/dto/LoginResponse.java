package com.estateconnect.backend.model.dto;

import com.estateconnect.backend.model.Role;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {
    private Long userId;
    private String token;
    private Role role;
    private String firstName;
}