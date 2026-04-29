require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Inicializar la aplicación
const app = express();

// Conectar a la base de datos
connectDB();

// Rutas
const authRoutes = require('./routes/auth.routes');
const projectRoutes = require('./routes/project.routes');
const taskRoutes = require('./routes/task.routes');
const errorHandler = require('./middleware/error.middleware');

// Middlewares
app.use(cors());
app.use(express.json());

// Montar rutas
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API de ProjectHub en funcionamiento');
});

// Manejo centralizado de errores profesional
app.use(errorHandler);

// Definir el puerto
const PORT = process.env.PORT || 5000;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// --- SCRIPT KEEP-ALIVE PARA RENDER ---
// Este script evita que el servidor entre en reposo tras 15 min de inactividad
const axios = require('axios');
const keepAlive = () => {
    const url = `https://projecthub-api-io9r.onrender.com/`;
    setInterval(async () => {
        try {
            await axios.get(url);
            console.log('--- Keep-Alive: Servidor activo ---');
        } catch (error) {
            console.error('Keep-Alive Error:', error.message);
        }
    }, 10 * 60 * 1000); // Ejecutar cada 10 minutos
};

keepAlive();
