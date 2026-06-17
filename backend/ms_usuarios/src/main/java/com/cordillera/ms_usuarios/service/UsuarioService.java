package com.cordillera.ms_usuarios.service;

import java.util.List;
import com.cordillera.ms_usuarios.model.UsuarioModel;
import com.cordillera.ms_usuarios.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder; // ✅ Inyectamos el encriptador de contraseñas de Spring Security

    // 🔥 NUEVO: Método de Login
    public UsuarioModel login(String email, String passwordPlana) {
        // 1. Buscamos al usuario por correo verificando de inmediato que esté ACTIVO
        UsuarioModel usuario = usuarioRepository.findByEmailAndActivoTrue(email)
            .orElseThrow(() -> new RuntimeException("Credenciales inválidas o el usuario no existe/está inactivo."));

        // 2. Comparamos la contraseña enviada con la encriptada en la BD
        if (!passwordEncoder.matches(passwordPlana, usuario.getPassword())) {
            throw new RuntimeException("Credenciales inválidas.");
        }

        // 3. Si todo es correcto, devolvemos el usuario
        return usuario;
    }

    // Obtener todos los usuarios activos (trabajadores actuales)
    public List<UsuarioModel> getUsuarios() {
        return usuarioRepository.findByActivoTrue();
    }

    // Obtener todos (admin/auditoría - incluye despedidos/inactivos)
    public List<UsuarioModel> getUsuariosAdmin() {
        return usuarioRepository.findAll();
    }

    // Obtener por ID
    public UsuarioModel getUsuarioById(int id) {
        return usuarioRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + id));
    }

    // Guardar nuevo usuario (con validaciones de negocio)
    public UsuarioModel saveUsuario(UsuarioModel usuario) {
        // 1. Validar que no existan duplicados clave
        if (usuarioRepository.existsByUsername(usuario.getUsername())) {
            throw new RuntimeException("Ya existe un usuario con el username: " + usuario.getUsername());
        }
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new RuntimeException("El correo electrónico ya está registrado: " + usuario.getEmail());
        }
        if (usuario.getRut() != null && usuarioRepository.existsByRut(usuario.getRut())) {
            throw new RuntimeException("El RUT ya está asociado a otro empleado: " + usuario.getRut());
        }

        // 2. Encriptar la contraseña antes de guardar en MariaDB/MySQL
        String passwordEncriptada = passwordEncoder.encode(usuario.getPassword());
        usuario.setPassword(passwordEncriptada);

        // 3. Guardar
        return usuarioRepository.save(usuario);
    }

    // Actualizar usuario existente
    public UsuarioModel updateUsuario(UsuarioModel usuario) {
        UsuarioModel usuarioExistente = usuarioRepository.findById(usuario.getId())
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + usuario.getId()));

        // Actualizamos los datos (generalmente el username y RUT no se cambian, o requieren otro flujo)
        usuarioExistente.setNombreCompleto(usuario.getNombreCompleto());
        usuarioExistente.setEmail(usuario.getEmail());
        usuarioExistente.setRol(usuario.getRol());
        usuarioExistente.setSucursal(usuario.getSucursal());

        // Si se envió una nueva contraseña, la encriptamos y la cambiamos
        if (usuario.getPassword() != null && !usuario.getPassword().isEmpty()) {
            usuarioExistente.setPassword(passwordEncoder.encode(usuario.getPassword()));
        }

        return usuarioRepository.save(usuarioExistente);
    }

    // Eliminación lógica (Ej: cuando un empleado renuncia o es despedido)
    public String desactivarUsuario(int id) {
        UsuarioModel usuario = usuarioRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + id));

        usuario.setActivo(false);
        usuarioRepository.save(usuario);
        return "Usuario desactivado correctamente. Ya no podrá iniciar sesión.";
    }

    // --- Métodos extra para la lógica del Grupo Cordillera ---

    // Filtrar personal activo por tienda física
    public List<UsuarioModel> getEmpleadosPorSucursal(String sucursal) {
        return usuarioRepository.findBySucursalAndActivoTrue(sucursal);
    }

    // Buscar cajeros o ejecutivos específicos en una tienda
    public List<UsuarioModel> getEmpleadosPorSucursalYRol(String sucursal, String rol) {
        return usuarioRepository.findEmpleadosPorSucursalYRol(sucursal, rol);
    }
}