package com.estateconnect.backend.model.dto;

import lombok.Getter;
import lombok.Setter;

import com.estateconnect.backend.model.Role;

@Getter
@Setter
public class RegisterResponse {
    private String firstName;
    private Role role;
}