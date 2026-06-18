package com.cordillera.ms_inventario.service;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
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
}