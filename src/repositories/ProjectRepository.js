const Project = require('../models/Project');

class ProjectRepository {
    async create(projectData) {
        return await Project.create(projectData);
    }

    async findAllByUser(userId) {
        return await Project.find({ user: userId }).populate('tasks');
    }

    async findById(id, userId) {
        return await Project.findOne({ _id: id, user: userId }).populate('tasks');
    }

    async update(id, userId, updateData) {
        return await Project.findOneAndUpdate(
            { _id: id, user: userId },
            updateData,
            { new: true, runValidators: true }
        );
    }

    async delete(id, userId) {
        const result = await Project.findOneAndDelete({ _id: id, user: userId });
        return !!result;
    }
}

module.exports = new ProjectRepository();
