package com.cordillera.ms_inventario.service;

import com.cordillera.ms_inventario.model.ProductoModel;
import com.cordillera.ms_inventario.repository.ProductoRepository;
import java.util.List;
import lombok.Generated;
import org.springframework.stereotype.Service;

@Service
public class ProductoService {
   private final ProductoRepository productoRepository;

   public List<ProductoModel> getProductos() {
      return this.productoRepository.findByActivoTrue();
   }

   public List<ProductoModel> getProductosAdmin() {
      return this.productoRepository.findAll();
   }

   public ProductoModel getProductoById(int id) {
      return (ProductoModel)this.productoRepository.findById(id).orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));
   }

   public ProductoModel saveProducto(ProductoModel producto) {
      if (this.productoRepository.existsBySku(producto.getSku())) {
         throw new RuntimeException("Ya existe un producto con el SKU: " + producto.getSku());
      } else {
         return (ProductoModel)this.productoRepository.save(producto);
      }
   }

   public ProductoModel updateProducto(ProductoModel producto) {
      ProductoModel productoExistente = (ProductoModel)this.productoRepository.findById(producto.getId()).orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + producto.getId()));
      productoExistente.setNombre(producto.getNombre());
      productoExistente.setDescripcion(producto.getDescripcion());
      productoExistente.setCategoria(producto.getCategoria());
      productoExistente.setMarca(producto.getMarca());
      productoExistente.setPrecio(producto.getPrecio());
      productoExistente.setStock(producto.getStock());
      productoExistente.setStockMinimo(producto.getStockMinimo());
      productoExistente.setCalidad(producto.getCalidad());
      return (ProductoModel)this.productoRepository.save(productoExistente);
   }

   public String desactivarProducto(int id) {
      ProductoModel producto = (ProductoModel)this.productoRepository.findById(id).orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));
      producto.setActivo(false);
      this.productoRepository.save(producto);
      return "Producto desactivado";
   }

   public List<ProductoModel> getProductosConStockBajo() {
      return this.productoRepository.findProductosConStockBajo();
   }

   @Generated
   public ProductoService(final ProductoRepository productoRepository) {
      this.productoRepository = productoRepository;
   }
}