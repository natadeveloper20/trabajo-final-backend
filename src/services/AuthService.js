const crypto = require('crypto');
const UserRepository = require('../repositories/UserRepository');
const { generateToken } = require('../utils/jwt');
const sendEmail = require('../utils/email');

class AuthService {
    async register(userData) {
        // Verificar si el usuario ya existe
        const userExists = await UserRepository.findByEmail(userData.email);
        if (userExists) {
            throw new Error('El usuario ya está registrado');
        }

        // Generar token de verificación
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const verificationTokenExpire = Date.now() + 24 * 60 * 60 * 1000; // 24 horas

        const user = await UserRepository.create({
            ...userData,
            isVerified: false,
            verificationToken,
            verificationTokenExpire
        });

        // Enviar email de verificación
        const verifyUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
        
        const message = `¡Bienvenido a ProjectHub! Por favor, verifica tu cuenta haciendo clic en el siguiente enlace: \n\n ${verifyUrl}`;
        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                <h2 style="color: #6366f1; text-align: center;">Bienvenido a ProjectHub</h2>
                <p>Hola <strong>${user.firstName}</strong>,</p>
                <p>Gracias por unirte a nuestra plataforma. Para empezar a gestionar tus proyectos con estilo, por favor verifica tu cuenta haciendo clic en el botón de abajo:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${verifyUrl}" style="background-color: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Verificar mi cuenta</a>
                </div>
                <p>Si el botón no funciona, puedes copiar y pegar el siguiente enlace en tu navegador:</p>
                <p style="word-break: break-all; color: #666;">${verifyUrl}</p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                <p style="font-size: 12px; color: #999; text-align: center;">Este enlace expirará en 24 horas.</p>
            </div>
        `;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Verificacion de cuenta - ProjectHub',
                message,
                html
            });
        } catch (error) {
            console.error('Error enviando email:', error);
            // No bloqueamos el registro si falla el envío, pero el usuario no podrá loguearse
        }

        return { user };
    }

    async login(email, password) {
        const user = await UserRepository.findByEmail(email);

        if (!user || !(await user.matchPassword(password))) {
            throw new Error('Credenciales inválidas');
        }

        if (!user.isVerified) {
            throw new Error('Por favor, verifica tu cuenta antes de iniciar sesión');
        }

        const token = generateToken(user._id);

        return { user, token };
    }

    async verifyEmail(token) {
        const user = await UserRepository.findByVerificationToken(token);

        if (!user) {
            throw new Error('Token de verificación inválido o expirado');
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpire = undefined;

        await user.save();

        return user;
    }
}

module.exports = new AuthService();
