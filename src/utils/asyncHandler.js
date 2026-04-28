/**
 * Wrapper para manejar errores en funciones asíncronas de Express.
 * Elimina la necesidad de usar bloques try-catch repetitivos en los controladores.
 */
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
