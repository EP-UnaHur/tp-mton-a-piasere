const Joi = require('joi')

const carreraSchema = Joi.object().keys({
    nombre: Joi.string().required().min(3).max(40).messages({
        "string.min": `nombre debe tener al menos {#limit} caracters.`,
        "string.max": `nombre debe tener como máximo {#limit} caracters.`,
        "string.empty": "nombre no puede estar vacio",
        "any.required": "nombre es requerido"      
    }),
    grado: Joi.number().required().messages({
        "number.empty": `El grado no puede estar vacio`,
        "any.required": "Grado es requerido" 
    }),
    universidad: Joi.string().required().min(3).max(50).messages({
        "string.min": `El nombre de la universidad debe tener al menos {#limit} caracters.`,
        "string.max": `El nombre de la universidad debe tener como máximo {#limit} caracters.`,
        "string.empty": "El nombre de la universidad no puede estar vacio",
        "any.required": "El nombre de la universidad es requerido"      
    })
})

module.exports = {carreraSchema}