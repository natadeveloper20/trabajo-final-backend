const ProjectService = require('../services/ProjectService');

const createProject = async (req, res) => {
    try {
        const project = await ProjectService.createProject(req.body, req.user._id);
        res.status(201).json({
            success: true,
            data: project
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const getProjects = async (req, res) => {
    try {
        const projects = await ProjectService.getAllProjects(req.user._id);
        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const getProject = async (req, res) => {
    try {
        const project = await ProjectService.getProjectById(req.params.id, req.user._id);
        res.status(200).json({
            success: true,
            data: project
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

const updateProject = async (req, res) => {
    try {
        const project = await ProjectService.updateProject(req.params.id, req.user._id, req.body);
        res.status(200).json({
            success: true,
            data: project
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const deleteProject = async (req, res) => {
    try {
        const response = await ProjectService.deleteProject(req.params.id, req.user._id);
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
    createProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject
};
