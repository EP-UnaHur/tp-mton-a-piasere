const express = require('express');
const router = express.Router();
const controller = require('../controllers/profesor.controller.js');

// Ruta para obtener todos las profesor
router.get('/profesores', controller.getAllProfesores);

// Ruta para obtener una profesor segun id
router.get('/profesores/:id', controller.getProfesorById);

// Ruta para crear una profesor
router.post('/profesores', controller.createProfesor);

// Ruta para editar un profesor
router.put('/profesores/:id', controller.editarProfesor);

// Ruta para eliminar un profesor
router.delete('/profesores/:id', controller.deleteProfesor);

//Ruta para obtener todos los cursos que tiene un profesor
router.get('/profesores/:id/cursos', controller.obtenerCursosDeProfesor);

module.exports = router;