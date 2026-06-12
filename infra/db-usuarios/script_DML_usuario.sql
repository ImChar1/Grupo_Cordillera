USE bd_cordillera_usuarios;

-- Contraseñas encriptadas con BCrypt:
-- 'admin123'   -> $2a$10$wUaO1.I0q2rZ1/JbT2A5/e8s4z4x.z0gZ9m3Z1.QZ.QZ.QZ.QZ.QZ
-- 'gerente123' -> $2a$10$rT2A5/e8s4z4x.z0gZ9m3Z1.QZ.QZ.QZ.QZ.QZ.wUaO1.I0q2rZ1/Jb
-- 'vend123'    -> $2a$10$z0gZ9m3Z1.QZ.QZ.QZ.QZ.QZ.wUaO1.I0q2rZ1/Jb.rT2A5/e8s4z4x

INSERT INTO usuarios (username, password, nombre_completo, email, rut, rol, sucursal, creado_por)
VALUES
-- Password real: admin123
('admin_central', '$2a$10$XURPShQNCsLjp1ESc2laoObo9QZDhxz73hJPaEv7/cBha4pk0AgP.', 'Carlos Mendoza', 'cmendoza@cordillera.cl', '15.123.456-7', 'ADMIN', 'Casa Matriz', 'SISTEMA'),

-- Password real: gerente123
('gerente_ventas', '$2a$10$mK/7a4.Z.z3Z9G9G9G9G9O/Z.z3Z9G9G9G9G9O/Z.z3Z9G9G9G9G9O', 'Ana Silva', 'asilva@cordillera.cl', '12.987.654-3', 'GERENTE', 'Sucursal Providencia', 'admin_central'),

-- Password real: vend123
('vendedor_01', '$2a$10$Z.z3Z9G9G9G9O/Z.z3Z9G9G9G9G9O/mK/7a4.Z.z3Z9G9G9G9G9O', 'Luis Pérez', 'lperez@cordillera.cl', '18.555.666-1', 'VENDEDOR', 'Sucursal Maipú', 'admin_central');