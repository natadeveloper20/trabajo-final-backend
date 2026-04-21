const express = require('express');
const router = express.Router();
const { register, login, verifyEmail } = require('../controllers/AuthController');
const validate = require('../middleware/validate.middleware');

// @desc    Registrar usuario
// @route   POST /api/auth/register
// @access  Public
router.post('/register', validate('register'), register);

// @desc    Login de usuario
// @route   POST /api/auth/login
// @access  Public
router.post('/login', validate('login'), login);

// @desc    Verificar email
// @route   GET /api/auth/verify/:token
// @access  Public
router.get('/verify/:token', verifyEmail);

module.exports = router;
