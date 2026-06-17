package com.cordillera.ms_usuarios.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "usuarios")
@Builder
public class UsuarioModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String username; // Para el login en el sistema

    @Column(nullable = false)
    private String password; // Se guardará encriptada gracias a Spring Security

    private String nombreCompleto;

    @Column(nullable = false, unique = true)
    private String email;

    private String rut; // Identificador común en empresas chilenas/latam

    private String rol; // Ej: "GERENTE", "ADMIN", "VENDEDOR", "SOPORTE"

    private String sucursal; // Para saber a qué sede pertenece (Punto de Venta)

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime fechaRegistro;

    @UpdateTimestamp
    private LocalDateTime fechaUltimaConexion;

    @Builder.Default
    private Boolean activo = true;

    // Puedes añadir este campo si necesitas saber quién lo creó
    private String creadoPor;
}