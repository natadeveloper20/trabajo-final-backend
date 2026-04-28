const TaskService = require('../services/TaskService');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Crear una tarea
// @route   POST /api/tasks
// @access  Private
const createTask = asyncHandler(async (req, res) => {
    const task = await TaskService.createTask(req.body, req.user._id);
    res.status(201).json({
        success: true,
        data: task
    });
});

// @desc    Obtener tareas de un proyecto
// @route   GET /api/tasks/project/:projectId
// @access  Private
const getTasksByProject = asyncHandler(async (req, res) => {
    const tasks = await TaskService.getTasksByProject(req.params.projectId, req.user._id);
    res.status(200).json({
        success: true,
        count: tasks.length,
        data: tasks
    });
});

// @desc    Obtener una tarea por ID
// @route   GET /api/tasks/:id
// @access  Private
const getTask = asyncHandler(async (req, res) => {
    const task = await TaskService.getTaskById(req.params.id, req.user._id);
    res.status(200).json({
        success: true,
        data: task
    });
});

// @desc    Actualizar una tarea
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
    const task = await TaskService.updateTask(req.params.id, req.user._id, req.body);
    res.status(200).json({
        success: true,
        data: task
    });
});

// @desc    Eliminar una tarea
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
    const response = await TaskService.deleteTask(req.params.id, req.user._id);
    res.status(200).json({
        success: true,
        message: response.message
    });
});

module.exports = {
    createTask,
    getTasksByProject,
    getTask,
    updateTask,
    deleteTask
};

