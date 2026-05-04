package com.cordillera.ms_inventario.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "productos")
@Builder
public class ProductoModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    private Boolean activo = true;

}


