const Joi = require('joi')
const validateDate = require('../utils/date.validator')

const profesorSchema = Joi.object().keys({
    nombre: Joi.string().required().min(3).max(50).messages({
        "string.min": `El nombre debe tener al menos {#limit} caracters.`,
        "string.max": `El nombre debe tener como máximo {#limit} caracters.`,
        "string.empty": "El nombre no puede ser vacio",
        "any.required": "El nombre es requerido"      
    }),
    fechaNacimiento: Joi.string().custom(validateDate).required().messages({
        "any.custom": "El formato de la fecha debe ser YYYY-MM-DD",
        "any.required": "El campo fecha es obligatorio"
    }),
    activo: Joi.boolean().required().messages({
        "boolean.empty": `Debe decidir si esta activo o no`,
        "any.required": "Estado activo es requerido" 
    }),
    legajo: Joi.number()
   
})

module.exports = profesorSchema