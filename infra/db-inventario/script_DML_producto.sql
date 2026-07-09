USE bd_cordillera_inventario;

INSERT INTO productos (nombre, descripcion, categoria, marca, sku, imagen, precio, stock, stock_minimo, calidad) 
VALUES
('Refrigerador No Frost 300L', 'Refrigerador de dos puertas con dispensador de agua.', 'Línea Blanca', 'Samsung', 'HOG-001', 'https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?w=800&q=80', 350000.00, 15, 5, 'ALTA'),
('Sofá Seccional 3 Cuerpos', 'Sofá de tela de lino color gris, diseño moderno.', 'Muebles', 'Rosen', 'HOG-002', 'https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?w=800&q=80', 250000.00, 10, 3, 'ALTA'),
('Microondas 20L', 'Microondas digital con 10 niveles de potencia.', 'Electrodomésticos', 'LG', 'HOG-003', 'https://images.unsplash.com/photo-1630699144310-980c8ed310e3?w=800&q=80', 45000.00, 30, 10, 'MEDIA'),
('Juego de Comedor 6 Sillas', 'Comedor de madera nativa con cubierta de vidrio.', 'Muebles', 'Ashley', 'HOG-004', 'https://images.unsplash.com/photo-1764076327046-fe35f955cba1?w=800&q=80', 320000.00, 8, 2, 'ALTA'),
('Licuadora 1.5L', 'Licuadora con jarra de vidrio, 3 velocidades y cuchillas de acero.', 'Electrodomésticos', 'Oster', 'HOG-005', 'https://images.unsplash.com/photo-1654064754916-e3edeb09c042?w=800&q=80', 35000.00, 50, 15, 'MEDIA');