const express = require('express');
const router = express.Router();
const { register, login, verifyEmail } = require('../controllers/AuthController');

// @desc    Registrar usuario
// @route   POST /api/auth/register
// @access  Public
router.post('/register', register);

// @desc    Login de usuario
// @route   POST /api/auth/login
// @access  Public
router.post('/login', login);

// @desc    Verificar email
// @route   GET /api/auth/verify/:token
// @access  Public
router.get('/verify/:token', verifyEmail);

module.exports = router;
