package com.cordillera.ms_inventario.service;
import java.util.List;
import com.cordillera.ms_inventario.model.ProductoModel;          // ← falta
import com.cordillera.ms_inventario.repository.ProductoRepository; // ← falta
import lombok.RequiredArgsConstructor;                             // ← falta
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductoService {

    private final ProductoRepository productoRepository; // ✅ final + @RequiredArgsConstructor en vez de @Autowired

    // Obtener todos los productos activos
    public List<ProductoModel> getProductos() {
        return productoRepository.findByActivoTrue();
    }

    // Obtener todos (admin)
    public List<ProductoModel> getProductosAdmin() {
        return productoRepository.findAll();
    }

    // Obtener por ID
    public ProductoModel getProductoById(int id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));
        // ✅ mejor que orElse(null) — evita NullPointerExceptions silenciosos
    }

    // Guardar nuevo producto
    public ProductoModel saveProducto(ProductoModel producto) {
        if (productoRepository.existsBySku(producto.getSku())) {
            throw new RuntimeException("Ya existe un producto con el SKU: " + producto.getSku());
        }
        return productoRepository.save(producto);
    }

    // Actualizar producto existente
    public ProductoModel updateProducto(ProductoModel producto) {
        ProductoModel productoExistente = productoRepository.findById(producto.getId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + producto.getId()));

        productoExistente.setNombre(producto.getNombre());
        productoExistente.setDescripcion(producto.getDescripcion());
        productoExistente.setCategoria(producto.getCategoria());
        productoExistente.setMarca(producto.getMarca());
        productoExistente.setPrecio(producto.getPrecio());
        productoExistente.setStock(producto.getStock());
        productoExistente.setStockMinimo(producto.getStockMinimo());
        productoExistente.setCalidad(producto.getCalidad());

        return productoRepository.save(productoExistente);
    }

    // Eliminación lógica
    public String desactivarProducto(int id) {
        ProductoModel producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));

        producto.setActivo(false);
        productoRepository.save(producto);
        return "Producto desactivado";
    }

    // Extra: alertas de stock bajo
    public List<ProductoModel> getProductosConStockBajo() {
        return productoRepository.findProductosConStockBajo();
    }
}
