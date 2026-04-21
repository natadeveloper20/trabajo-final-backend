const TaskRepository = require('../repositories/TaskRepository');

class TaskService {
    async createTask(taskData, userId) {
        return await TaskRepository.create({ ...taskData, user: userId });
    }

    async getTasksByProject(projectId, userId) {
        return await TaskRepository.findAllByProject(projectId, userId);
    }

    async getTaskById(id, userId) {
        const task = await TaskRepository.findById(id, userId);
        if (!task) {
            throw new Error('Tarea no encontrada');
        }
        return task;
    }

    async updateTask(id, userId, updateData) {
        const task = await TaskRepository.update(id, userId, updateData);
        if (!task) {
            throw new Error('Tarea no encontrada o no tienes permiso');
        }
        return task;
    }

    async deleteTask(id, userId) {
        const success = await TaskRepository.delete(id, userId);
        if (!success) {
            throw new Error('Error al eliminar la tarea');
        }
        return { message: 'Tarea eliminada correctamente' };
    }
}

module.exports = new TaskService();
