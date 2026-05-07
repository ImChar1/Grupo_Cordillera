package com.cordillera.ms_inventario.model;


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
@Table(name = "productos")
@Builder
public class ProductoModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nombre;
    private String descripcion;
    private String categoria;
    private String marca;
    private String sku;           // código único del producto (ej: "PROD-001")
    private Double precio;
    private Integer stock;
    private Integer stockMinimo;  // para alertas de reabastecimiento

    private String calidad;       // o podrías usar un Enum: ALTA, MEDIA, BAJA

    @CreationTimestamp
    private LocalDateTime fechaCreacion;

    @UpdateTimestamp
    private LocalDateTime fechaActualizacion;

    @Builder.Default
    private Boolean activo = true;

}


