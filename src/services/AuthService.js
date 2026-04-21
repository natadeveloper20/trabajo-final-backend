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

        const user = await UserRepository.create({
            ...userData,
            isVerified: true // Verificado por defecto para facilitar entrega
        });

        return { user };
    }

    async login(email, password) {
        const user = await UserRepository.findByEmail(email);

        if (!user || !(await user.matchPassword(password))) {
            throw new Error('Credenciales inválidas');
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
