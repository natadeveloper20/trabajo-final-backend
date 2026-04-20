const crypto = require('crypto');
const UserRepository = require('../repositories/UserRepository');
const { generateToken } = require('../utils/jwt');

class AuthService {
    async register(userData) {
        // Verificar si el usuario ya existe
        const userExists = await UserRepository.findByEmail(userData.email);
        if (userExists) {
            throw new Error('El usuario ya está registrado');
        }

        // Generar token de verificación
        const verificationToken = crypto.randomBytes(20).toString('hex');
        const verificationTokenExpire = Date.now() + 24 * 60 * 60 * 1000; // 24 horas

        const user = await UserRepository.create({
            ...userData,
            verificationToken,
            verificationTokenExpire
        });

        // Retornar el usuario y el token (el token se enviará por email después)
        return { user, verificationToken };
    }

    async login(email, password) {
        const user = await UserRepository.findByEmail(email);

        if (!user || !(await user.matchPassword(password))) {
            throw new Error('Credenciales inválidas');
        }

        if (!user.isVerified) {
            throw new Error('Por favor, verifica tu email antes de iniciar sesión');
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
