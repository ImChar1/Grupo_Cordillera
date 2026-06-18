package com.cordillera.ms_usuarios.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.cordillera.ms_usuarios.model.UsuarioModel;
import com.cordillera.ms_usuarios.repository.UsuarioRepository;

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
        UsuarioModel usuarioNuevo = new UsuarioModel();
        usuarioNuevo.setUsername("carlos123");
        usuarioNuevo.setEmail("carlos@cordillera.cl");
        usuarioNuevo.setPassword("12345");

        when(usuarioRepository.existsByUsername("carlos123")).thenReturn(false);
        when(usuarioRepository.existsByEmail("carlos@cordillera.cl")).thenReturn(true);

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            usuarioService.saveUsuario(usuarioNuevo);
        });

        assertEquals("El correo electrónico ya está registrado: carlos@cordillera.cl", exception.getMessage());
        
        verify(usuarioRepository, never()).save(any(UsuarioModel.class));
    }

    @Test
    void guardarUsuario_Exito() {
        UsuarioModel usuarioNuevo = new UsuarioModel();
        usuarioNuevo.setUsername("nuevoUser");
        usuarioNuevo.setEmail("nuevo@cordillera.cl");
        usuarioNuevo.setPassword("claveSecreta123");

        UsuarioModel usuarioGuardado = new UsuarioModel();
        usuarioGuardado.setId(1); 
        usuarioGuardado.setUsername("nuevoUser");
        usuarioGuardado.setEmail("nuevo@cordillera.cl");
        usuarioGuardado.setPassword("hash_encriptado_abc123");

        when(usuarioRepository.existsByUsername("nuevoUser")).thenReturn(false);
        when(usuarioRepository.existsByEmail("nuevo@cordillera.cl")).thenReturn(false);

        when(passwordEncoder.encode("claveSecreta123")).thenReturn("hash_encriptado_abc123");

        when(usuarioRepository.save(any(UsuarioModel.class))).thenReturn(usuarioGuardado);

        UsuarioModel resultado = usuarioService.saveUsuario(usuarioNuevo);

        assertNotNull(resultado);
        assertEquals(1, resultado.getId());
        assertEquals("hash_encriptado_abc123", resultado.getPassword()); 

        verify(passwordEncoder, times(1)).encode("claveSecreta123");
        verify(usuarioRepository, times(1)).save(usuarioNuevo);
    }
}