# Control de Gastos 2022187 — Sistema de Login/Registro con Roles

Sistema de autenticación con registro y login, con dos roles de usuario (**Admin** y **Usuario**), desarrollado como proyecto académico.

## Tecnologías

**Backend**
- Node.js + TypeScript
- Express
- PostgreSQL (`pg`)
- JWT (`jsonwebtoken`) para autenticación
- `bcrypt` para hash de contraseñas
- Gestor de paquetes: `pnpm`

**Frontend**
- Angular 22 (standalone components)
- Tailwind CSS v4
- Reactive Forms
- Gestor de paquetes: `pnpm`

## Estructura del proyecto

control-gastos-2022187/
├── backend/
│ └── src/
│ ├── expenses/ # reservado para un futuro módulo
│ ├── config/
│ │ └── db.ts # conexión a PostgreSQL
│ ├── modules/
│ │ ├── controllers/
│ │ ├── services/
│ │ ├── models/
│ │ └── routers/
│ ├── app.ts
│ └── server.ts
└── frontend/
└── src/app/
├── core/
│ ├── services/
│ └── guards/
└── pages/
├── login/
├── register/
├── dashboard-admin/
└── dashboard-user/

## Requisitos previos

- Node.js (LTS)
- pnpm (`npm install -g pnpm`)
- PostgreSQL
- Angular CLI (se usa localmente vía `npx ng`)

## Base de datos

Crear una base de datos en PostgreSQL llamada `authsystem_db` y ejecutar:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMP DEFAULT NOW()
);
```

## Instalación y ejecución

### Backend

```bash
cd backend
pnpm install
```

Crear un archivo `.env` en `backend/` con:
PORT=3000
DB_USER=postgres
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=authsystem_db
JWT_SECRET=una_clave_secreta

Levantar el servidor:
```bash
pnpm run dev
```
Disponible en `http://localhost:3000`.

### Frontend

```bash
cd frontend
pnpm install
npx ng serve
```
Disponible en `http://localhost:4200`.


## El flujo de mi aplicación

1. El usuario se registra eligiendo su rol (`user` o `admin`).
2. Inicia sesión y recibe un token JWT.
3. Según el rol, es redirigido a `/dashboard` (usuario) o `/admin` (administrador).
4. Las rutas están protegidas con un guard que valida sesión y rol.

## Flujo de mis ramas (Git)

- `main`: rama estable/entregable.
- `develop`: rama de integración.
- `grodriguez-2022187`: rama personal de desarrollo.

Los cambios se integran a `develop` mediante Pull Requests desde la rama personal, y de `develop` a `main` cuando el proyecto está estable.

## Autor
Nombre: Gahel Emiliano Rodriguez Albeño
Fecha: 14/08/2026
grodriguez-2022187@kinal.edu.gt
Carné 2022187