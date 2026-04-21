const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'el título de la tarea es obligatorio'],
        trim: true,
        maxlength: [100, 'el título no puede exceder los 100 caracteres']
    },
    description: {
        type: String,
        required: [true, 'la descripción es obligatoria']
    },
    status: {
        type: String,
        enum: ['pendiente', 'en progreso', 'completada'],
        default: 'pendiente'
    },
    priority: {
        type: String,
        enum: ['baja', 'media', 'alta'],
        default: 'media'
    },
    dueDate: {
        type: Date
    },
    project: {
        type: mongoose.Schema.ObjectId,
        ref: 'Project',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);
