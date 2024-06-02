const express = require('express');
const router = express.Router();
const controller = require('../controllers/carrera.controller');

// Ruta para obtener todas las carreras
router.get('/carreras', controller.getAllCarrers);

// Ruta para obtener una carrera segun id
router.get('/carreras/:id', controller.getCareerById);

// Ruta para crear una carrera
router.post('/carreras', controller.createCareer);


module.exports = router;