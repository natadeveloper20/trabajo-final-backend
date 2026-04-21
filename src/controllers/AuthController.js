const AuthService = require('../services/AuthService');
const sendEmail = require('../utils/email');

const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const { user } = await AuthService.register({
            firstName,
            lastName,
            email,
            password
        });

        res.status(201).json({
            success: true,
            message: 'Usuario registrado con éxito. Ya puedes iniciar sesión.'
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const login = async (req, res) => {
    try {
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
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;
        await AuthService.verifyEmail(token);

        res.status(200).json({
            success: true,
            message: 'Email verificado correctamente. Ya puedes iniciar sesión.'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    register,
    login,
    verifyEmail
};
