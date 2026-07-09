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

    // ─── LOGIN ──────────────────────────────────────────────────

    @Test
    void login_Exito() {
        UsuarioModel usuarioExistente = new UsuarioModel();
        usuarioExistente.setId(1);
        usuarioExistente.setEmail("carlos@cordillera.cl");
        usuarioExistente.setPassword("hash_encriptado_abc123");

        when(usuarioRepository.findByEmailAndActivoTrue("carlos@cordillera.cl"))
            .thenReturn(java.util.Optional.of(usuarioExistente));
        when(passwordEncoder.matches("12345", "hash_encriptado_abc123")).thenReturn(true);

        UsuarioModel resultado = usuarioService.login("carlos@cordillera.cl", "12345");

        assertNotNull(resultado);
        assertEquals(1, resultado.getId());
    }

    @Test
    void login_FallaCuandoElUsuarioNoExisteOEstaInactivo() {
        when(usuarioRepository.findByEmailAndActivoTrue("nadie@cordillera.cl"))
            .thenReturn(java.util.Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            usuarioService.login("nadie@cordillera.cl", "12345");
        });

        assertEquals("Credenciales inválidas o el usuario no existe/está inactivo.", exception.getMessage());
    }

    @Test
    void login_FallaCuandoLaContraseñaEsIncorrecta() {
        UsuarioModel usuarioExistente = new UsuarioModel();
        usuarioExistente.setEmail("carlos@cordillera.cl");
        usuarioExistente.setPassword("hash_encriptado_abc123");

        when(usuarioRepository.findByEmailAndActivoTrue("carlos@cordillera.cl"))
            .thenReturn(java.util.Optional.of(usuarioExistente));
        when(passwordEncoder.matches("claveIncorrecta", "hash_encriptado_abc123")).thenReturn(false);

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            usuarioService.login("carlos@cordillera.cl", "claveIncorrecta");
        });

        assertEquals("Credenciales inválidas.", exception.getMessage());
    }

    // ─── UPDATE ─────────────────────────────────────────────────

    @Test
    void updateUsuario_Exito_SinCambiarPassword() {
        UsuarioModel existente = new UsuarioModel();
        existente.setId(2);
        existente.setNombreCompleto("Nombre Viejo");
        existente.setEmail("viejo@cordillera.cl");
        existente.setPassword("hash_original");

        UsuarioModel datosNuevos = new UsuarioModel();
        datosNuevos.setId(2);
        datosNuevos.setNombreCompleto("Nombre Nuevo");
        datosNuevos.setEmail("nuevo@cordillera.cl");
        datosNuevos.setRol("ADMIN");
        datosNuevos.setSucursal("Casa Matriz");
        // password vacío/no enviado → no debe cambiar

        when(usuarioRepository.findById(2)).thenReturn(java.util.Optional.of(existente));
        when(usuarioRepository.save(any(UsuarioModel.class))).thenAnswer(inv -> inv.getArgument(0));

        UsuarioModel resultado = usuarioService.updateUsuario(datosNuevos);

        assertEquals("Nombre Nuevo", resultado.getNombreCompleto());
        assertEquals("nuevo@cordillera.cl", resultado.getEmail());
        assertEquals("hash_original", resultado.getPassword()); // no cambió
        verify(passwordEncoder, never()).encode(any());
    }

    @Test
    void updateUsuario_EncriptaLaNuevaPassword_SiSeEnvia() {
        UsuarioModel existente = new UsuarioModel();
        existente.setId(3);
        existente.setPassword("hash_viejo");

        UsuarioModel datosNuevos = new UsuarioModel();
        datosNuevos.setId(3);
        datosNuevos.setPassword("nuevaClave123");

        when(usuarioRepository.findById(3)).thenReturn(java.util.Optional.of(existente));
        when(passwordEncoder.encode("nuevaClave123")).thenReturn("hash_nuevo");
        when(usuarioRepository.save(any(UsuarioModel.class))).thenAnswer(inv -> inv.getArgument(0));

        UsuarioModel resultado = usuarioService.updateUsuario(datosNuevos);

        assertEquals("hash_nuevo", resultado.getPassword());
        verify(passwordEncoder, times(1)).encode("nuevaClave123");
    }

    @Test
    void updateUsuario_FallaCuandoNoExiste() {
        UsuarioModel datosNuevos = new UsuarioModel();
        datosNuevos.setId(999);

        when(usuarioRepository.findById(999)).thenReturn(java.util.Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            usuarioService.updateUsuario(datosNuevos);
        });

        assertEquals("Usuario no encontrado con id: 999", exception.getMessage());
    }

    // ─── DESACTIVAR ─────────────────────────────────────────────

    @Test
    void desactivarUsuario_Exito() {
        UsuarioModel usuario = new UsuarioModel();
        usuario.setId(4);
        usuario.setActivo(true);

        when(usuarioRepository.findById(4)).thenReturn(java.util.Optional.of(usuario));
        when(usuarioRepository.save(any(UsuarioModel.class))).thenReturn(usuario);

        String resultado = usuarioService.desactivarUsuario(4);

        assertEquals("Usuario desactivado correctamente. Ya no podrá iniciar sesión.", resultado);
        assertEquals(false, usuario.getActivo());
        verify(usuarioRepository, times(1)).save(usuario);
    }

    @Test
    void desactivarUsuario_FallaCuandoNoExiste() {
        when(usuarioRepository.findById(999)).thenReturn(java.util.Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            usuarioService.desactivarUsuario(999);
        });

        assertEquals("Usuario no encontrado con id: 999", exception.getMessage());
    }
}