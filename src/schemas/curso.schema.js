const Joi = require('joi')
const validateDate = require('../utils/date.validator.js');

const cursoSchema = Joi.object().keys({
    comision: Joi.string().max(20).messages({
        "string.max": `La comision debe tener como máximo {#limit} caracters.`
    }),
    turno: Joi.string().required().min(3).max(20).messages({
        "string.min": `El turno del curso debe tener al menos {#limit} caracters.`,
        "string.max": `El turno del curso debe tener como máximo {#limit} caracters.`,
        "string.empty": "El turno del curso no puede estar vacio",
        "any.required": "El turno del curso es requerido"      
    }),
    fechaInicio: Joi.string().custom(validateDate).required().messages({
        "any.custom": "El formato de la fechaInicio debe ser YYYY-MM-DD",
        "any.required": "El campo fechaInicio es obligatorio"
    }),
    fechaFin: Joi.string().custom(validateDate).required().messages({
        "any.custom": "El formato de la fechaInicio debe ser YYYY-MM-DD",
        "any.required": "El campo fechaInicio es obligatorio"
    })
})

module.exports = {cursoSchema}