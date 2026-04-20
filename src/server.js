require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Inicializar la aplicación
const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API de ProjectHub en funcionamiento');
});

// Manejo centralizado de errores (básico)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// Definir el puerto
const PORT = process.env.PORT || 5000;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
