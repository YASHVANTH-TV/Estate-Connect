package com.estateconnect.backend.model.dto;

import lombok.Getter;
import lombok.Setter;

import com.estateconnect.backend.model.Role;

@Getter
@Setter
public class RegisterRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String mobileNumber;
    private String password;
    private Role role;
}