const AuthService = require('../services/AuthService');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Registrar usuario
// @route   POST /api/auth/register
// @access  Public
const register = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    await AuthService.register({
        firstName,
        lastName,
        email,
        password
    });

    res.status(201).json({
        success: true,
        message: 'Usuario registrado con éxito. Por favor, revisa tu email para verificar tu cuenta.'
    });
});

// @desc    Iniciar sesión
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const { user, token } = await AuthService.login(email, password);

    res.status(200).json({
        success: true,
        token,
        user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        }
    });
});

// @desc    Verificar email
// @route   GET /api/auth/verify/:token
// @access  Public
const verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.params;
    await AuthService.verifyEmail(token);

    res.status(200).json({
        success: true,
        message: 'Email verificado correctamente. Ya puedes iniciar sesión.'
    });
});

module.exports = {
    register,
    login,
    verifyEmail
};

