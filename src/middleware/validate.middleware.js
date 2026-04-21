const Joi = require('joi');

// Esquemas de validación
const schemas = {
    // Auth
    register: Joi.object({
        firstName: Joi.string().required().min(2).max(50),
        lastName: Joi.string().required().min(2).max(50),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6)
    }),
    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),
    
    // Proyectos
    project: Joi.object({
        name: Joi.string().required().max(100),
        description: Joi.string().required().max(500)
    }),

    // Tareas
    task: Joi.object({
        title: Joi.string().required().max(100),
        description: Joi.string().required(),
        status: Joi.string().valid('pendiente', 'en progreso', 'completada'),
        priority: Joi.string().valid('baja', 'media', 'alta'),
        dueDate: Joi.date().allow('', null),
        project: Joi.string().required() // ID del proyecto
    })
};

const validate = (schemaName) => {
    return (req, res, next) => {
        const schema = schemas[schemaName];
        if (!schema) {
            return next(new Error(`Esquema de validación '${schemaName}' no encontrado`));
        }

        const { error } = schema.validate(req.body, { abortEarly: false });
        
        if (error) {
            const message = error.details.map(detail => detail.message).join(', ');
            return res.status(400).json({
                success: false,
                message: `Error de validación: ${message}`
            });
        }
        
        next();
    };
};

module.exports = validate;
