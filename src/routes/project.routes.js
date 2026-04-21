const express = require('express');
const router = express.Router();
const { 
    createProject, 
    getProjects, 
    getProject, 
    updateProject, 
    deleteProject 
} = require('../controllers/ProjectController');
const { protect } = require('../middleware/auth.middleware');

// Todas las rutas de proyectos requieren estar logueado
router.use(protect);

router.route('/')
    .get(getProjects)
    .post(createProject);

router.route('/:id')
    .get(getProject)
    .put(updateProject)
    .delete(deleteProject);

module.exports = router;
