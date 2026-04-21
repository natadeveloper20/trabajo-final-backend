const TaskService = require('../services/TaskService');

const createTask = async (req, res) => {
    try {
        const task = await TaskService.createTask(req.body, req.user._id);
        res.status(201).json({
            success: true,
            data: task
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const getTasksByProject = async (req, res) => {
    try {
        const tasks = await TaskService.getTasksByProject(req.params.projectId, req.user._id);
        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const getTask = async (req, res) => {
    try {
        const task = await TaskService.getTaskById(req.params.id, req.user._id);
        res.status(200).json({
            success: true,
            data: task
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await TaskService.updateTask(req.params.id, req.user._id, req.body);
        res.status(200).json({
            success: true,
            data: task
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const deleteTask = async (req, res) => {
    try {
        const response = await TaskService.deleteTask(req.params.id, req.user._id);
        res.status(200).json({
            success: true,
            message: response.message
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createTask,
    getTasksByProject,
    getTask,
    updateTask,
    deleteTask
};
