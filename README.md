# ProjectHub - Backend

Sistema de gestión de proyectos y tareas desarrollado con el stack MERN (MongoDB, Express, Node.js). Este repositorio contiene la API REST lógica del Trabajo Integrador Final para la UTN.

## Características Técnicas
- **Arquitectura Robusta**: Implementación en capas (Routes → Controllers → Services → Repositories) para facilitar el escalado y mantenimiento.
- **Seguridad de Nivel Producción**: 
  - Hasheo de contraseñas con `bcryptjs` (salt 10).
  - Autenticación vía `JWT` con tokens que expiran en 24h.
  - Verificación de cuenta por email obligatoria mediante `Nodemailer`.
- **Validación y Middleware**: Protección de rutas sensibles, manejo centralizado de errores y validación de esquemas con middlewares personalizados.
- **Base de Datos**: MongoDB Atlas con relaciones relacionales simuladas mediante `ObjectId` y `.populate()`.

## Tecnologías Utilizadas
- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: Mongoose
- **Seguridad**: JWT, BcryptJS, Crypto
- **Envío de Emails**: Nodemailer (Configurado para SMTP)

## Instalación y Configuración

1. **Clonar y Entrar**:
   ```bash
   cd backend
   ```
2. **Instalar Dependencias**:
   ```bash
   npm install
   ```
3. **Configurar Variables de Entorno**:
   Crea un archivo `.env` basado en el siguiente ejemplo:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://tu_usuario:tu_password@cluster.mongodb.net/projecthub
   JWT_SECRET=tu_secreto_super_seguro
   JWT_EXPIRES_IN=24h
   
   # Configuración de Email (Mailtrap recomendado para pruebas)
   EMAIL_HOST=smtp.mailtrap.io
   EMAIL_PORT=2525
   EMAIL_USER=tu_usuario
   EMAIL_PASS=tu_password
   
   # Frontend URL para links de verificación
   FRONTEND_URL=http://localhost:5173
   ```
4. **Iniciar**:
   ```bash
   npm run dev
   ```

## Endpoints de la API

### Autenticación
- `POST /api/auth/register`: Registro de usuario (envía email de verificación).
- `POST /api/auth/login`: Login (bloqueado si no está verificado). Devuelve JWT.
- `GET /api/auth/verify/:token`: Activa la cuenta del usuario.

### Gestión de Proyectos (JWT Requerido)
- `GET /api/projects`: Lista proyectos del usuario actual.
- `POST /api/projects`: Crea un proyecto nuevo.
- `GET /api/projects/:id`: Detalle de proyecto + lista de sus tareas (.populate).
- `PUT /api/projects/:id`: Edita metadatos del proyecto.
- `DELETE /api/projects/:id`: Elimina proyecto y limpia cascada de tareas.

### Gestión de Tareas (JWT Requerido)
- `POST /api/tasks`: Crea tarea vinculada a un proyecto.
- `PUT /api/tasks/:id`: Actualiza estado (Pendiente/En Progreso/Completada).
- `DELETE /api/tasks/:id`: Elimina tarea específica.

## 📄 Licencia e Info
Proyecto desarrollado por alumnos de la UTN para la cátedra de Programación Web Avanzada (PWA).

---
*Nota: Este proyecto incluye una colección de Postman (`postman_collection.json`) en la raíz para facilitar las pruebas técnicas.*
