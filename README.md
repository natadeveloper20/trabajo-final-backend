# ProjectHub - Backend 

Sistema de gestión de proyectos y tareas desarrollado con Node.js, Express y MongoDB. Este repositorio contiene la API REST lógica del Trabajo Integrador Final.

## Características
- **Arquitectura en capas**: Routes → Controllers → Services → Repositories.
- **Seguridad**: Hasheo de contraseñas con `bcryptjs` y autenticación vía `JWT` (JSON Web Tokens).
- **Verificación por Email**: Implementada con `Nodemailer`.
- **Relaciones**: Los proyectos pertenecen a usuarios y las tareas pertenecen a proyectos.
- **Validación**: Uso de middlewares para validación de inputs y protección de rutas.

## Tecnologías
- Node.js
- Express
- MongoDB (Mongoose)
- JWT
- Nodemailer

## Instalación y Uso

1. Clonar el repositorio.
2. Ejecutar `npm install` para instalar las dependencias.
3. Configurar el archivo `.env` con las siguientes variables:
   ```env
   PORT=5000
   MONGODB_URI=tu_uri_de_mongodb
   JWT_SECRET=tu_secreto_super_seguro
   EMAIL_HOST=tu_host_email
   EMAIL_PORT=587
   EMAIL_USER=tu_usuario_email
   EMAIL_PASS=tu_password_email
   FRONTEND_URL=http://localhost:5173
   ```
4. Ejecutar `npm run dev` para iniciar en modo desarrollo.

## Endpoints de la API

### Autenticación
- `POST /api/auth/register`: Registro de nuevo usuario.
- `POST /api/auth/login`: Inicio de sesión (devuelve token).
- `GET /api/auth/verify/:token`: Verificación de cuenta por email.

### Proyectos (Protegidos por JWT)
- `GET /api/projects`: Listar todos los proyectos del usuario.
- `POST /api/projects`: Crear un nuevo proyecto.
- `GET /api/projects/:id`: Obtener detalle de un proyecto (incluye sus tareas).
- `PUT /api/projects/:id`: Actualizar un proyecto.
- `DELETE /api/projects/:id`: Eliminar un proyecto y sus tareas asociadas.

### Tareas (Protegidas por JWT)
- `POST /api/tasks`: Crear una nueva tarea.
- `GET /api/tasks/project/:projectId`: Listar tareas de un proyecto específico.
- `PUT /api/tasks/:id`: Actualizar estado/datos de una tarea.
- `DELETE /api/tasks/:id`: Eliminar una tarea.

## 📄 Licencia
Este proyecto es para fines académicos (UTN - PWA).
