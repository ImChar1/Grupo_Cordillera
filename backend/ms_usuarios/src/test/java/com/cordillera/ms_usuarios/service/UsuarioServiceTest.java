package com.cordillera.ms_usuarios.service;

import com.cordillera.ms_usuarios.model.UsuarioModel;
import com.cordillera.ms_usuarios.repository.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UsuarioServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UsuarioService usuarioService;

    @Test
    void guardarUsuario_FallaCuandoEmailYaExiste() {
        // 1. Preparar el escenario (Given)
        UsuarioModel usuarioNuevo = new UsuarioModel();
        usuarioNuevo.setUsername("carlos123");
        usuarioNuevo.setEmail("carlos@cordillera.cl");
        usuarioNuevo.setPassword("12345");

        // Simulamos que la base de datos dice "Sí, el email ya existe"
        when(usuarioRepository.existsByUsername("carlos123")).thenReturn(false);
        when(usuarioRepository.existsByEmail("carlos@cordillera.cl")).thenReturn(true);

        // 2. Ejecutar y verificar (When & Then)
        // Verificamos que el sistema lance una excepción con el mensaje correcto
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            usuarioService.saveUsuario(usuarioNuevo);
        });

        assertEquals("El correo electrónico ya está registrado: carlos@cordillera.cl", exception.getMessage());
        
        // Verificamos que NUNCA se haya llamado al método save() de la base de datos
        verify(usuarioRepository, never()).save(any(UsuarioModel.class));
    }
}