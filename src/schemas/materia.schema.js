const Joi = require('joi')

const materiaSchema = Joi.object().keys({
    nombre: Joi.string().required().min(3).max(40).messages({
        "string.min": `nombre debe tener al menos {#limit} caracters.`,
        "string.max": `nombre debe tener como máximo {#limit} caracters.`,
        "string.empty": "nombre no puede estar vacio",
        "any.required": "nombre es requerido"      
    }),
    cuatrimestral: Joi.boolean().required().messages({
        "boolean.empty": `Debe decidir si es cuatrimestral o no`,
        "any.required": "Cuatrimestral es requerido" 
    }),
    anio: Joi.number().required().messages({
        "any.required": "El año es requerido" 
    })
})

module.exports = {materiaSchema}