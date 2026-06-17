package com.cordillera.ms_inventario.repository;

import com.cordillera.ms_inventario.model.ProductoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface ProductoRepository extends JpaRepository<ProductoModel, Integer>{
    List<ProductoModel> findByActivoTrue();

     // Buscar por nombre (útil para buscadores)
    List<ProductoModel> findByNombreContainingIgnoreCase(String nombre);

    // Buscar por categoría
    List<ProductoModel> findByCategoriaAndActivoTrue(String categoria);

    // Verificar si ya existe un SKU (para evitar duplicados)
    boolean existsBySku(String sku);
    Optional<ProductoModel> findBySku(String sku);

    // Productos con stock bajo (para alertas)
    @Query("SELECT p FROM ProductoModel p WHERE p.stock <= p.stockMinimo AND p.activo = true")
    List<ProductoModel> findProductosConStockBajo();
}
