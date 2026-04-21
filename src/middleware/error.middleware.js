const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Log para el desarrollador
    console.error(err.stack);

    // Error de Mongoose (ID no encontrado)
    if (err.name === 'CastError') {
        const message = `Recurso no encontrado. ID inválido: ${err.value}`;
        return res.status(404).json({ success: false, message });
    }

    // Error de duplicados (Mongoose)
    if (err.code === 11000) {
        const message = 'Se detectó un valor duplicado en un campo único';
        return res.status(400).json({ success: false, message });
    }

    // Error de validación (Mongoose)
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        return res.status(400).json({ success: false, message });
    }

    // Respuesta por defecto
    res.status(err.statusCode || 500).json({
        success: false,
        message: error.message || 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err.stack : {}
    });
};

module.exports = errorHandler;
