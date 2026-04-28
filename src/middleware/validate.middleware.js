const Joi = require('joi');

// Esquemas de validación con mensajes personalizados en español
const schemas = {
    // Autenticación
    register: Joi.object({
        firstName: Joi.string().trim().min(2).max(50).required().messages({
            'string.empty': 'El nombre no puede estar vacío',
            'string.min': 'El nombre debe tener al menos 2 caracteres',
            'any.required': 'El nombre es obligatorio'
        }),
        lastName: Joi.string().trim().min(2).max(50).required().messages({
            'string.empty': 'El apellido no puede estar vacío',
            'any.required': 'El apellido es obligatorio'
        }),
        email: Joi.string().trim().email().required().messages({
            'string.email': 'Debe ingresar un email válido',
            'string.empty': 'El email es obligatorio'
        }),
        password: Joi.string().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$')).required().messages({
            'string.min': 'La contraseña debe tener al menos 8 caracteres',
            'string.pattern.base': 'La contraseña debe contener al menos una mayúscula, una minúscula y un número',
            'any.required': 'La contraseña es obligatoria'
        })
    }),

    login: Joi.object({
        email: Joi.string().email().required().messages({
            'string.email': 'Ingrese un email válido',
            'any.required': 'El email es obligatorio'
        }),
        password: Joi.string().required().messages({
            'any.required': 'La contraseña es obligatoria'
        })
    }),
    
    // Proyectos
    project: Joi.object({
        name: Joi.string().trim().min(3).max(100).required().messages({
            'string.min': 'El nombre del proyecto debe tener al menos 3 caracteres',
            'any.required': 'El nombre del proyecto es obligatorio'
        }),
        description: Joi.string().trim().max(500).required().messages({
            'any.required': 'La descripción es obligatoria'
        })
    }),

    // Tareas
    task: Joi.object({
        title: Joi.string().trim().min(3).max(100).required().messages({
            'string.min': 'El título debe tener al menos 3 caracteres',
            'any.required': 'El título es obligatorio'
        }),
        description: Joi.string().trim().allow(''),
        status: Joi.string().valid('pendiente', 'en progreso', 'completada').default('pendiente'),
        priority: Joi.string().valid('baja', 'media', 'alta').default('media'),
        dueDate: Joi.date().iso().allow('', null).messages({
            'date.format': 'La fecha debe tener un formato válido (ISO)'
        }),
        project: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
            'string.pattern.base': 'ID de proyecto no válido',
            'any.required': 'El ID del proyecto es obligatorio'
        })
    })
};

const validate = (schemaName) => {
    return (req, res, next) => {
        const schema = schemas[schemaName];
        if (!schema) {
            return res.status(500).json({ 
                success: false, 
                message: `Error interno: Esquema '${schemaName}' no definido` 
            });
        }

        const { error } = schema.validate(req.body, { abortEarly: false });
        
        if (error) {
            const errorMessages = error.details.map(detail => detail.message);
            return res.status(400).json({
                success: false,
                message: errorMessages.length > 1 ? 'Varios errores de validación' : errorMessages[0],
                errors: errorMessages
            });
        }
        
        next();
    };
};

module.exports = validate;

