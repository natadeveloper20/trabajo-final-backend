const ProjectService = require('../services/ProjectService');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Crear un proyecto
// @route   POST /api/projects
// @access  Private
const createProject = asyncHandler(async (req, res) => {
    const project = await ProjectService.createProject(req.body, req.user._id);
    res.status(201).json({
        success: true,
        data: project
    });
});

// @desc    Obtener todos los proyectos del usuario
// @route   GET /api/projects
// @access  Private
const getProjects = asyncHandler(async (req, res) => {
    const projects = await ProjectService.getAllProjects(req.user._id);
    res.status(200).json({
        success: true,
        count: projects.length,
        data: projects
    });
});

// @desc    Obtener un proyecto por ID
// @route   GET /api/projects/:id
// @access  Private
const getProject = asyncHandler(async (req, res) => {
    const project = await ProjectService.getProjectById(req.params.id, req.user._id);
    res.status(200).json({
        success: true,
        data: project
    });
});

// @desc    Actualizar un proyecto
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = asyncHandler(async (req, res) => {
    const project = await ProjectService.updateProject(req.params.id, req.user._id, req.body);
    res.status(200).json({
        success: true,
        data: project
    });
});

// @desc    Eliminar un proyecto
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = asyncHandler(async (req, res) => {
    const response = await ProjectService.deleteProject(req.params.id, req.user._id);
    res.status(200).json({
        success: true,
        message: response.message
    });
});

module.exports = {
    createProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject
};

