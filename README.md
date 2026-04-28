# ProjectHub - API REST (Backend)

Sistema de gestión de proyectos y tareas desarrollado con el stack **MERN** (MongoDB, Express, Node.js). Este proyecto forma parte del Trabajo Integrador Final para la **UTN**.

## Arquitectura del Sistema

Se ha implementado una **arquitectura en capas** sólida para garantizar la escalabilidad y facilidad de mantenimiento:

- **Routes**: Definición de endpoints y aplicación de middlewares.
- **Controllers**: Manejo de la lógica de petición/respuesta (Request/Response).
- **Services**: Lógica de negocio pura y comunicación entre entidades.
- **Repositories**: Abstracción del acceso a datos (Mongoose Queries).
- **Models**: Definición de esquemas de datos con validaciones integradas.

## Seguridad y Validaciones

- **Autenticación**: JWT (JSON Web Tokens) con expiración de 24h.
- **Hashing**: Cifrado de contraseñas con `bcryptjs` en el modelo de usuario.
- **Validación de Input**: Esquemas estrictos con `Joi` para asegurar la integridad de los datos.
- **Email Verification**: Sistema obligatorio de activación de cuenta vía `Nodemailer`.
- **Manejo de Errores**: Middleware centralizado para respuestas de error consistentes.

## Instalación y Configuración

1. **Clonar el repositorio**:

   ```bash
   git clone [URL-DEL-REPO]
   cd ProjectHub/backend
   ```

2. **Instalar dependencias**:

   ```bash
   npm install
   ```

3. **Configurar el entorno**:
   Crea un archivo `.env` en la raíz de `backend/` usando como base el archivo `.env.example`:

   ```env
   PORT=5000
   MONGODB_URI=tu_conexion_mongodb_atlas
   JWT_SECRET=tu_secreto_seguro
   JWT_EXPIRES_IN=24h
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=465
   EMAIL_USER=tu_usuario
   EMAIL_PASS=tu_password_de_aplicacion
   FRONTEND_URL=http://localhost:5173
   ```

5. **Documentación Postman**:
   Se incluye el archivo `ProjectHub.postman_collection.json` en la raíz de este repositorio. Puedes importarlo en Postman para probar todos los endpoints de forma automática.

4. **Iniciar servidor**:
   ```bash
   npm run dev
   ```

## Endpoints de la API

### Autenticación

| Método | Ruta                      | Descripción                     | Acceso  |
| ------ | ------------------------- | ------------------------------- | ------- |
| POST   | `/api/auth/register`      | Registro de nuevo usuario       | Público |
| POST   | `/api/auth/login`         | Inicio de sesión (devuelve JWT) | Público |
| GET    | `/api/auth/verify/:token` | Verificación de email           | Público |

### Proyectos (Entidad Principal)

| Método | Ruta                | Descripción                           | Acceso  |
| ------ | ------------------- | ------------------------------------- | ------- |
| GET    | `/api/projects`     | Listar todos los proyectos            | Privado |
| POST   | `/api/projects`     | Crear nuevo proyecto                  | Privado |
| GET    | `/api/projects/:id` | Detalle de proyecto y sus tareas      | Privado |
| PUT    | `/api/projects/:id` | Editar proyecto                       | Privado |
| DELETE | `/api/projects/:id` | Eliminar proyecto y tareas en cascada | Privado |

### Tareas (Entidad Relacionada)

| Método | Ruta             | Descripción                      | Acceso  |
| ------ | ---------------- | -------------------------------- | ------- |
| POST   | `/api/tasks`     | Crear tarea vinculada a proyecto | Privado |
| PUT    | `/api/tasks/:id` | Cambiar estado/prioridad         | Privado |
| DELETE | `/api/tasks/:id` | Eliminar tarea                   | Privado |

## Credenciales de Prueba (Para el Docente)

Para facilitar la corrección, se proporcionan las siguientes credenciales de un usuario **YA VERIFICADO**:

- **Email:** `projecthubsistema@gmail.com`
- **Password:** `Proyecto123`
- **Estado:** Ya verificado (Acceso directo al Dashboard)

---

**Desarrollado para:** UTN - Programación Web Avanzada.
**URL Deploy API:** [Placeholder: Tu_URL_de_Render_o_Railway]
