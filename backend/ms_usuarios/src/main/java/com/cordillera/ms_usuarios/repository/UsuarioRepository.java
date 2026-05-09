package com.cordillera.ms_usuarios.repository;

import com.cordillera.ms_usuarios.model.UsuarioModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<UsuarioModel, Integer> {

    // 1. Obtener solo los usuarios que siguen trabajando en la empresa
    List<UsuarioModel> findByActivoTrue();

    // 2. Fundamentales para el Login (Spring Security)
    Optional<UsuarioModel> findByUsernameAndActivoTrue(String username);
    Optional<UsuarioModel> findByEmailAndActivoTrue(String email);

    // 3. Validaciones para crear o registrar un usuario (evitar duplicados)
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByRut(String rut);

    // 4. Filtros gerenciales e institucionales (Basado en el caso Cordillera)
    
    // Buscar todos los empleados de una tienda física en particular
    List<UsuarioModel> findBySucursalAndActivoTrue(String sucursal);

    // Buscar a todos los empleados de un mismo departamento (ej: "SOPORTE" o "CAJERO")
    List<UsuarioModel> findByRolAndActivoTrue(String rol);

    // 5. Query Personalizada: Buscar personal activo de una sucursal con un rol específico
    // Ej: "¿Quiénes son los cajeros activos de la Sucursal Santiago Centro?"
    @Query("SELECT u FROM UsuarioModel u WHERE u.sucursal = :sucursal AND u.rol = :rol AND u.activo = true")
    List<UsuarioModel> findEmpleadosPorSucursalYRol(@Param("sucursal") String sucursal, @Param("rol") String rol);
}