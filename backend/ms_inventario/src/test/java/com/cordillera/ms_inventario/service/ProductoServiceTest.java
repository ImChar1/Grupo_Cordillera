package com.cordillera.ms_inventario.service;

import com.cordillera.ms_inventario.model.ProductoModel;
import com.cordillera.ms_inventario.repository.ProductoRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProductoServiceTest {

    @Mock
    private ProductoRepository productoRepository;

    @InjectMocks
    private ProductoService productoService;

    @Test
    void saveProducto_FallaCuandoSkuYaExiste() {
        // 1. Preparar el escenario: Intentamos ingresar una lavadora, pero el SKU ya lo tiene otro producto
        ProductoModel lavadora = new ProductoModel();
        lavadora.setNombre("Lavadora Carga Frontal 10kg");
        lavadora.setCategoria("Línea Blanca");
        lavadora.setSku("LB-LAV-001");

        // Simulamos que el repositorio encuentra ese SKU
        when(productoRepository.existsBySku("LB-LAV-001")).thenReturn(true);

        // 2. Ejecutar y Verificar
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            productoService.saveProducto(lavadora);
        });

        // Comprobamos que el mensaje de error sea exactamente el programado
        assertEquals("Ya existe un producto con el SKU: LB-LAV-001", exception.getMessage());
        
        // Verificamos que no se haya guardado nada en la base de datos
        verify(productoRepository, never()).save(any(ProductoModel.class));
    }

    @Test
    void desactivarProducto_Exito() {
        // 1. Preparar el escenario: Tenemos un sofá activo que queremos descontinuar
        ProductoModel sofa = new ProductoModel();
        sofa.setId(15);
        sofa.setNombre("Sofá Seccional 3 Cuerpos");
        sofa.setCategoria("Muebles");
        sofa.setActivo(true);

        // Simulamos que el repositorio encuentra el sofá por su ID
        when(productoRepository.findById(15)).thenReturn(Optional.of(sofa));
        
        // Simulamos el guardado exitoso
        when(productoRepository.save(any(ProductoModel.class))).thenReturn(sofa);

        // 2. Ejecutar
        String resultado = productoService.desactivarProducto(15);

        // 3. Verificar
        assertEquals("Producto desactivado", resultado);
        assertFalse(sofa.getActivo()); // El atributo "activo" debió cambiar a false
        verify(productoRepository, times(1)).save(sofa); // Aseguramos que se llamó al método save una vez
    }

    @Test
    void getProductoById_FallaCuandoNoExiste() {
        // 1. Preparar el escenario: Buscamos un ID de una lámpara que no existe
        int idInexistente = 999;
        when(productoRepository.findById(idInexistente)).thenReturn(Optional.empty());

        // 2. Ejecutar y Verificar
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            productoService.getProductoById(idInexistente);
        });

        assertEquals("Producto no encontrado con id: 999", exception.getMessage());
    }
}