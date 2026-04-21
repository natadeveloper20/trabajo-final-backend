const ProjectRepository = require('../repositories/ProjectRepository');

class ProjectService {
    async createProject(projectData, userId) {
        return await ProjectRepository.create({ ...projectData, user: userId });
    }

    async getAllProjects(userId) {
        return await ProjectRepository.findAllByUser(userId);
    }

    async getProjectById(id, userId) {
        const project = await ProjectRepository.findById(id, userId);
        if (!project) {
            throw new Error('Proyecto no encontrado');
        }
        return project;
    }

    async updateProject(id, userId, updateData) {
        const project = await ProjectRepository.update(id, userId, updateData);
        if (!project) {
            throw new Error('Proyecto no encontrado o no tienes permiso');
        }
        return project;
    }

    async deleteProject(id, userId) {
        const success = await ProjectRepository.delete(id, userId);
        if (!success) {
            throw new Error('Error al eliminar el proyecto');
        }
        return { message: 'Proyecto eliminado correctamente' };
    }
}

module.exports = new ProjectService();
