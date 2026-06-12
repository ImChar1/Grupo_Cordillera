package com.cordillera.ms_inventario.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cordillera.ms_inventario.model.ProductoModel;
import com.cordillera.ms_inventario.service.ProductoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/productos")
@RequiredArgsConstructor  // ✅ en vez de @Autowired
public class ProductoController {

    private final ProductoService productoService;

    // GET /api/v1/productos → listar activos
    @GetMapping
    public ResponseEntity<List<ProductoModel>> listarProductos() {
        return ResponseEntity.ok(productoService.getProductos());
    }

    // GET /api/v1/productos/{id} → obtener por ID
    @GetMapping("/{id}")
    public ResponseEntity<ProductoModel> obtenerProducto(@PathVariable int id) {
        return ResponseEntity.ok(productoService.getProductoById(id));
    }

    // POST /api/v1/productos → crear nuevo
    @PostMapping
    public ResponseEntity<ProductoModel> crearProducto(@RequestBody ProductoModel producto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(productoService.saveProducto(producto));
    }

    // PUT /api/v1/productos → actualizar
    @PutMapping
    public ResponseEntity<ProductoModel> actualizarProducto(@RequestBody ProductoModel producto) {
        return ResponseEntity.ok(productoService.updateProducto(producto));
    }

    // DELETE /api/v1/productos/{id} → eliminación lógica
    @DeleteMapping("/{id}")
    public ResponseEntity<String> desactivarProducto(@PathVariable int id) {
        return ResponseEntity.ok(productoService.desactivarProducto(id));
    }

    // GET /api/v1/productos/stock-bajo → alertas
    @GetMapping("/stock-bajo")
    public ResponseEntity<List<ProductoModel>> productosConStockBajo() {
        return ResponseEntity.ok(productoService.getProductosConStockBajo());
    }
}