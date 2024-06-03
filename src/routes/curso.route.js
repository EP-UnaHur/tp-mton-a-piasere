const express = require('express');
const router = express.Router();
const controller = require("../controllers/curso.controllers");
const middleware = require('../middlewares/existeConId.middleware.js')
const {Curso} = require('../db/models')
// Ruta para obtener todos los cursos
router.get('/cursos', controller.getAllCursos);

// Ruta para obtener un curso segun id
router.get('/cursos/:id',middleware.existsById(Curso),controller.getCursoById);

// Ruta para eliminar un curso
router.delete('/cursos/:id',middleware.existsById(Curso),controller.eliminarCurso);

// Ruta para modificar los datos de un curso
router.put('/cursos/:id',middleware.existsById(Curso), controller.actualizarCurso);

//Crea la asociacion de un curso con 1 o N profesores
router.post('/cursos/:id/profesores', middleware.existsById(Curso),controller.crearAsociacionCursoProfesor)

//Obtener todos los profesores de un Curso
router.get('/cursos/:id/profesores',middleware.existsById(Curso),controller.obtenerProfesoresDeCurso);

module.exports = router;