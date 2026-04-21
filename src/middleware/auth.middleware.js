const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/UserRepository');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Obtener el token del header
            token = req.headers.authorization.split(' ')[1];

            // Verificar el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Obtener el usuario del token y adjuntarlo a la petición
            req.user = await UserRepository.findById(decoded.id);

            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'No autorizado, usuario no encontrado'
                });
            }

            next();
        } catch (error) {
            console.error('Error en autenticación JWT:', error.message);
            res.status(401).json({
                success: false,
                message: 'No autorizado, token fallido'
            });
        }
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No autorizado, no hay token'
        });
    }
};

// Middleware para restringir acceso por roles (opcional pero profesional)
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `El rol de usuario no tiene permisos para realizar esta acción`
            });
        }
        next();
    };
};

module.exports = { protect, authorize };
