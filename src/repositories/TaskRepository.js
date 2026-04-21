const Task = require('../models/Task');

class TaskRepository {
    async create(taskData) {
        return await Task.create(taskData);
    }

    async findAllByProject(projectId, userId) {
        return await Task.find({ project: projectId, user: userId });
    }

    async findById(id, userId) {
        return await Task.findOne({ _id: id, user: userId });
    }

    async update(id, userId, updateData) {
        return await Task.findOneAndUpdate(
            { _id: id, user: userId },
            updateData,
            { new: true, runValidators: true }
        );
    }

    async delete(id, userId) {
        return await Task.findOneAndDelete({ _id: id, user: userId });
    }
}

module.exports = new TaskRepository();
