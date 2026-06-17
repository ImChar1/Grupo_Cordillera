package com.cordillera.ms_usuarios.dto;

import lombok.Data;

@Data // <-- ESTA ANOTACIÓN ES LA QUE CREA getEmail() Y getPassword()
public class LoginRequest {
    private String email;
    private String password;
}