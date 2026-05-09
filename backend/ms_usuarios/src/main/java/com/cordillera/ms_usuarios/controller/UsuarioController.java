package com.cordillera.ms_usuarios.controller;

import com.cordillera.ms_usuarios.model.UsuarioModel;
import com.cordillera.ms_usuarios.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    // 1. Obtener todos los usuarios activos
    // GET: http://localhost:8082/api/usuarios
    @GetMapping
    public ResponseEntity<List<UsuarioModel>> getUsuarios() {
        return ResponseEntity.ok(usuarioService.getUsuarios());
    }

    // 2. Obtener un usuario por ID
    // GET: http://localhost:8082/api/usuarios/5
    @GetMapping("/{id}")
    public ResponseEntity<UsuarioModel> getUsuarioById(@PathVariable int id) {
        return ResponseEntity.ok(usuarioService.getUsuarioById(id));
    }

    // 3. Crear un nuevo usuario
    // POST: http://localhost:8082/api/usuarios
    @PostMapping
    public ResponseEntity<UsuarioModel> saveUsuario(@RequestBody UsuarioModel usuario) {
        UsuarioModel nuevoUsuario = usuarioService.saveUsuario(usuario);
        return new ResponseEntity<>(nuevoUsuario, HttpStatus.CREATED);
    }

    // 4. Actualizar un usuario existente
    // PUT: http://localhost:8082/api/usuarios
    @PutMapping
    public ResponseEntity<UsuarioModel> updateUsuario(@RequestBody UsuarioModel usuario) {
        return ResponseEntity.ok(usuarioService.updateUsuario(usuario));
    }

    // 5. Desactivar un usuario (Borrado lógico)
    // DELETE: http://localhost:8082/api/usuarios/5
    @DeleteMapping("/{id}")
    public ResponseEntity<String> desactivarUsuario(@PathVariable int id) {
        return ResponseEntity.ok(usuarioService.desactivarUsuario(id));
    }

    // --- Endpoints de Negocio para Grupo Cordillera ---

    // 6. Filtrar empleados por Sucursal
    // GET: http://localhost:8082/api/usuarios/sucursal/SantiagoCentro
    @GetMapping("/sucursal/{sucursal}")
    public ResponseEntity<List<UsuarioModel>> getEmpleadosPorSucursal(@PathVariable String sucursal) {
        return ResponseEntity.ok(usuarioService.getEmpleadosPorSucursal(sucursal));
    }

    // 7. Filtrar empleados por Sucursal y Rol
    // GET: http://localhost:8082/api/usuarios/sucursal/SantiagoCentro/rol/CAJERO
    @GetMapping("/sucursal/{sucursal}/rol/{rol}")
    public ResponseEntity<List<UsuarioModel>> getEmpleadosPorSucursalYRol(
            @PathVariable String sucursal, 
            @PathVariable String rol) {
        return ResponseEntity.ok(usuarioService.getEmpleadosPorSucursalYRol(sucursal, rol));
    }
}