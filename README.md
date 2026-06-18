# Grupo_cordillera

Plataforma Web para la gestión de venta electrónica de productos para el hogar de la empresa Grupo Cordillera en Chile.  
Stack: Java 21 · Spring Boot 3.4.5 · MariaDB · Docker · React + Vite

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
5. [Acceso al panel de administración](#5-acceso-al-panel-de-administración)
6. [Limitaciones conocidas](#6-limitaciones-conocidas)

---

## 1. Requisitos previos

Instalar en la máquina local antes de continuar:

| Herramienta    | Versión mínima | Verificar con          |
|----------------|----------------|------------------------|
| Docker Desktop | 24.x           | `docker --version`     |
| Docker Compose | 2.x            | `docker compose version` |
| Java JDK       | 21             | `java -version`        |
| Git            | cualquiera     | `git --version`        |

> **No es necesario instalar Maven, MariaDB, node o npm** en el host. Docker los gestiona internamente.

---

## 2. Variables de entorno

Crear el archivo `.env` en la raíz de `Desarrollo/` (mismo nivel que `docker-compose.yml`).  
**Este archivo nunca se sube al repositorio** (está en `.gitignore`).

```bash
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

---

## 3. Levantar en desarrollo local (Docker Compose)

Todos los comandos se ejecutan desde la carpeta `Desarrollo/`.

### 3.1 Primera vez (construir imagen y levantar)

```bash
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

---

## 5. Acceso al panel de administración

El panel de administración (`/admin`) solo es accesible para cuentas con rol `ADMIN`. Al iniciar sesión con una de esas cuentas, el sistema redirige automáticamente al panel.

La cuenta admin **no se crea desde el formulario de registro**, sino directamente en la base de datos. El comando usado fue un `INSERT` o `UPDATE` manual vía SQL contra el contenedor `db-usuarios`, asignando el rol `ADMIN` al usuario deseado. Por ejemplo:

```sql
UPDATE usuarios SET rol = 'ADMIN' WHERE email = 'correo@ejemplo.cl';
```

> Si los contenedores están corriendo, se puede ejecutar con:
> ```bash
> docker exec -it db-usuarios mariadb -u us_user -pus_pass bd_cordillera_usuarios \
>   -e "UPDATE usuarios SET rol = 'ADMIN' WHERE email = 'correo@ejemplo.cl';"
> ```
> Luego cerrar sesión y volver a iniciar para que el rol se refresque.

---

## 6. Limitaciones conocidas

El sistema está en etapa de desarrollo y tiene las siguientes limitaciones conocidas que **no se consideran bugs**, sino trabajo pendiente:

- **Sin validación de formularios:** Los formularios de creación y edición de usuarios no tienen validaciones en el frontend. Por ejemplo, las contraseñas pueden ser de un solo carácter — no hay restricción de longitud mínima ni de complejidad.
- **Sin validación de formato:** No se valida que el RUT tenga formato chileno correcto, ni que el email no esté duplicado antes de enviar al backend.
- **Rol ADMIN no asignable desde la UI:** El formulario de creación de empleados no permite asignar el rol `ADMIN` como opción disponible por seguridad; debe hacerse directamente en la base de datos.
- **Cuenta admin creada manualmente:** No existe un flujo de onboarding para el primer administrador; se asume que se crea vía SQL antes de usar el sistema.