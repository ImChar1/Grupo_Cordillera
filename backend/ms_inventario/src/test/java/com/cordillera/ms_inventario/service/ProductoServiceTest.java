package com.cordillera.ms_inventario.service;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
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

import com.cordillera.ms_inventario.model.ProductoModel;
import com.cordillera.ms_inventario.repository.ProductoRepository;

@ExtendWith(MockitoExtension.class)
public class ProductoServiceTest {

    @Mock
    private ProductoRepository productoRepository;

    
    @InjectMocks
    private ProductoService productoService;

    @Test
    void saveProducto_FallaCuandoSkuYaExiste() {
        ProductoModel lavadora = new ProductoModel();
        lavadora.setNombre("Lavadora Carga Frontal 10kg");
        lavadora.setCategoria("Línea Blanca");
        lavadora.setSku("LB-LAV-001");

        when(productoRepository.existsBySku("LB-LAV-001")).thenReturn(true);

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            productoService.saveProducto(lavadora);
        });

        assertEquals("Ya existe un producto con el SKU: LB-LAV-001", exception.getMessage());
        verify(productoRepository, never()).save(any(ProductoModel.class));
    }

    @Test
    void saveProducto_Exito() {
        ProductoModel televisor = new ProductoModel();
        televisor.setNombre("Smart TV 55 pulgadas");
        televisor.setCategoria("Electrónica");
        televisor.setSku("EL-TV-055");
        televisor.setActivo(true);

        ProductoModel televisorGuardado = new ProductoModel();
        televisorGuardado.setId(100); 
        televisorGuardado.setNombre("Smart TV 55 pulgadas");
        televisorGuardado.setCategoria("Electrónica");
        televisorGuardado.setSku("EL-TV-055");
        televisorGuardado.setActivo(true);

        when(productoRepository.existsBySku("EL-TV-055")).thenReturn(false);

        when(productoRepository.save(any(ProductoModel.class))).thenReturn(televisorGuardado);

        ProductoModel resultado = productoService.saveProducto(televisor);

        assertNotNull(resultado);
        assertEquals(100, resultado.getId());
        assertEquals("EL-TV-055", resultado.getSku());
        
        verify(productoRepository, times(1)).existsBySku("EL-TV-055");
        verify(productoRepository, times(1)).save(televisor);
    }

    @Test
    void desactivarProducto_Exito() {
        // 1. Preparar el escenario
        ProductoModel sofa = new ProductoModel();
        sofa.setId(15);
        sofa.setNombre("Sofá Seccional 3 Cuerpos");
        sofa.setCategoria("Muebles");
        sofa.setActivo(true);

        when(productoRepository.findById(15)).thenReturn(Optional.of(sofa));
        when(productoRepository.save(any(ProductoModel.class))).thenReturn(sofa);

        String resultado = productoService.desactivarProducto(15);

        assertEquals("Producto desactivado", resultado);
        assertFalse(sofa.getActivo()); 
        verify(productoRepository, times(1)).save(sofa); 
    }

    @Test
    void getProductoById_FallaCuandoNoExiste() {
        int idInexistente = 999;
        when(productoRepository.findById(idInexistente)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            productoService.getProductoById(idInexistente);
        });

        assertEquals("Producto no encontrado con id: 999", exception.getMessage());
    }

    // ─── UPDATE ─────────────────────────────────────────────────

    @Test
    void updateProducto_Exito() {
        ProductoModel existente = new ProductoModel();
        existente.setId(50);
        existente.setNombre("Nombre Viejo");
        existente.setDescripcion("Descripción vieja");
        existente.setCategoria("Categoría Vieja");
        existente.setMarca("Marca Vieja");
        existente.setPrecio(new java.math.BigDecimal("100000"));
        existente.setStock(10);
        existente.setStockMinimo(2);
        existente.setCalidad("MEDIA");

        ProductoModel datosNuevos = new ProductoModel();
        datosNuevos.setId(50);
        datosNuevos.setNombre("Nombre Nuevo");
        datosNuevos.setDescripcion("Descripción nueva");
        datosNuevos.setCategoria("Categoría Nueva");
        datosNuevos.setMarca("Marca Nueva");
        datosNuevos.setPrecio(new java.math.BigDecimal("150000"));
        datosNuevos.setStock(20);
        datosNuevos.setStockMinimo(5);
        datosNuevos.setCalidad("ALTA");

        when(productoRepository.findById(50)).thenReturn(Optional.of(existente));
        when(productoRepository.save(any(ProductoModel.class))).thenAnswer(inv -> inv.getArgument(0));

        ProductoModel resultado = productoService.updateProducto(datosNuevos);

        assertEquals("Nombre Nuevo", resultado.getNombre());
        assertEquals("Descripción nueva", resultado.getDescripcion());
        assertEquals("Categoría Nueva", resultado.getCategoria());
        assertEquals("Marca Nueva", resultado.getMarca());
        assertEquals(new java.math.BigDecimal("150000"), resultado.getPrecio());
        assertEquals(20, resultado.getStock());
        assertEquals(5, resultado.getStockMinimo());
        assertEquals("ALTA", resultado.getCalidad());

        verify(productoRepository, times(1)).save(existente);
    }

    @Test
    void updateProducto_FallaCuandoNoExiste() {
        ProductoModel datosNuevos = new ProductoModel();
        datosNuevos.setId(999);

        when(productoRepository.findById(999)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            productoService.updateProducto(datosNuevos);
        });

        assertEquals("Producto no encontrado con id: 999", exception.getMessage());
        verify(productoRepository, never()).save(any(ProductoModel.class));
    }

    // ─── STOCK BAJO ─────────────────────────────────────────────

    @Test
    void getProductosConStockBajo_DevuelveLosProductosDelRepositorio() {
        ProductoModel sillon = new ProductoModel();
        sillon.setId(7);
        sillon.setNombre("Sillón");
        sillon.setStock(1);
        sillon.setStockMinimo(5);

        java.util.List<ProductoModel> productosConStockBajo = java.util.List.of(sillon);

        when(productoRepository.findProductosConStockBajo()).thenReturn(productosConStockBajo);

        java.util.List<ProductoModel> resultado = productoService.getProductosConStockBajo();

        assertEquals(1, resultado.size());
        assertEquals("Sillón", resultado.get(0).getNombre());
        verify(productoRepository, times(1)).findProductosConStockBajo();
    }

    @Test
    void getProductosConStockBajo_DevuelveListaVaciaCuandoNoHayNinguno() {
        when(productoRepository.findProductosConStockBajo()).thenReturn(java.util.List.of());

        java.util.List<ProductoModel> resultado = productoService.getProductosConStockBajo();

        assertTrue(resultado.isEmpty());
    }
}