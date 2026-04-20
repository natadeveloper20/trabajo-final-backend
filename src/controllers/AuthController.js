const AuthService = require('../services/AuthService');
const sendEmail = require('../utils/email');

const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const { user, verificationToken } = await AuthService.register({
            firstName,
            lastName,
            email,
            password
        });

        // Enviar email de verificación
        const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
        
        const message = `Bienvenido a ProjectHub. Por favor, verifica tu cuenta haciendo clic en el siguiente enlace: ${verificationUrl}`;
        const html = `
            <h1>Bienvenido a ProjectHub</h1>
            <p>Por favor, verifica tu cuenta haciendo clic en el botón de abajo:</p>
            <a href="${verificationUrl}" style="padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Verificar Email</a>
            <p>Si no creaste esta cuenta, ignora este mensaje.</p>
        `;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Verificación de Cuenta - ProjectHub',
                message,
                html
            });

            res.status(201).json({
                success: true,
                message: 'Usuario registrado. Por favor, revisa tu email para verificar tu cuenta.'
            });
        } catch (emailError) {
            // Si falla el email, igual el usuario se creó, pero marcamos el error
            console.error('Error al enviar email:', emailError);
            res.status(201).json({
                success: true,
                message: 'Usuario registrado, pero hubo un problema al enviar el email de verificación.'
            });
        }

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
