# Grupo_cordillera

Plataforma Web para la gestión de venta electronica de productos para el hogar de la empresa Grupo Cordillera en Chile.
Stack: Java 21 · Spring Boot 3.4.5 · MariaDB · Docker · React + Vite ·

---

## 🏗️ Arquitectura del Sistema
El ecosistema está compuesto por los siguientes contenedores:
1. **Bases de Datos (MariaDB):** Instancias separadas para Inventario y Usuarios (Patrón *Database per Service*).
2. **Microservicio de Inventario (`ms-inventario`):** Gestiona el catálogo de productos para el hogar.
3. **Microservicio de Usuarios (`ms-usuarios`):** Gestiona la autenticación, roles y perfiles.
4. **API Gateway:** Enrutador central (Puerto 8080) que expone los servicios de forma segura.
5. **Frontend (React/Vite):** Interfaz de usuario servida de forma optimizada mediante Nginx.

## Índice

1. [Requisitos previos](#1-requisitos-previos)
2. [Variables de entorno](#2-variables-de-entorno)
3. [Levantar en desarrollo local (Docker Compose)](#3-levantar-en-desarrollo-local-docker-compose)
4. [Verificar que todo funciona](#4-verificar-que-todo-funciona)

---

## 1. Requisitos previos

Instalar en la máquina local antes de continuar:

| Herramienta    | Versión mínima | Verificar con |

| Docker Desktop | 24.x       | `docker --version` |
| Docker Compose | 2.x        | `docker compose version` |
| Java JDK       | 21         | `java -version` |
| Git            | cualquiera | `git --version` |

> **No es necesario instalar Maven, MariaDB, node o npm** en el host. Docker los gestiona internamente.

---

## 2. Variables de entorno

Crear el archivo `.env` en la raíz de `Desarrollo/` (mismo nivel que `docker-compose.yml`).
**Este archivo nunca se sube al repositorio** (está en `.gitignore`).

```bash
# backend/  →  crear archivo .env
# Base de datos inventario — usadas por docker-compose.yml para crear el contenedor MariaDB
DB_INVENTARIO_ROOT_PASSWORD=root_inv_pass
DB_INVENTARIO_NAME=bd_cordillera_inventario
DB_INVENTARIO_USER=inv_user
DB_INVENTARIO_PASSWORD=inv_pass

# Base de datos usuarios — usadas por docker-compose.yml para crear el contenedor MariaDB
DB_USUARIOS_ROOT_PASSWORD=root_us_pass
DB_USUARIOS_NAME=bd_cordillera_usuarios
DB_USUARIOS_USER=us_user
DB_USUARIOS_PASSWORD=us_pass

# Swagger
SWAGGER_ENABLED=true
```

## 3. Levantar en desarrollo local (Docker Compose)

Todos los comandos se ejecutan desde la carpeta `Desarrollo/`.

### 3.1 Primera vez (construir imagen y levantar)

```bash
# Construir la imagen del backend y levantar ambos contenedores
docker compose up --build -d

```

### 3.2 Arranques posteriores (imagen ya construida)

```bash
docker compose up -d
```

### 3.3 Ver logs en tiempo real

```bash
# Todos los servicios
docker compose logs -f

# Solo el backend
docker compose logs -f backend

# Solo la base de datos
docker compose logs -f db
```

### 3.4 Detener los contenedores

```bash
# Detener sin borrar datos
docker compose down

# Detener Y borrar el volumen (borra todos los datos de la BD)
docker compose down -v
```
---

## 4. Verificar que todo funciona

### 4.1 Confirmar que los contenedores están corriendo

```bash
docker ps
```

### 4.2 Probar la API con curl

```bash
# Health check básico (debe responder 200 o 404 conocido)
curl -X GET http://localhost:8080/api/v1/productos \
  -H "Accept: application/json"

```

### 4.3 Abrir Swagger UI

```
http://localhost:8080/api/v1/swagger-ui/swagger-ui/index.html
```
### 4.4 Abrir ruta React
```
http://localhost:3000
```