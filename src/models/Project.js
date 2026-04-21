const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre del proyecto es obligatorio'],
        trim: true,
        maxlength: [100, 'El nombre no puede exceder los 100 caracteres']
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
        maxlength: [500, 'La descripción no puede exceder los 500 caracteres']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Relación virtual con Tareas (no se guarda en la BD, se popula)
projectSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'project',
    justOne: false
});

// Eliminar tareas asociadas cuando se borra un proyecto
projectSchema.pre('remove', async function() {
    await this.model('Task').deleteMany({ project: this._id });
});

module.exports = mongoose.model('Project', projectSchema);
