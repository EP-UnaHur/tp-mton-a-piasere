const middleware = {}

const existsById = (Model) => {
    
    return async (req, res, next) => {
        const id = req.params.id
        const modelo = await Model.findByPk(id)
        const modelName = Model.modelName || (Model.options.name && Model.options.name.singular);
        if (!modelo) {
            return res.status(404).json({
                mensaje: `El ${modelName} con id ${id} no existe`
            }
            )
        }
        next()
    }
}

middleware.existsById = existsById;

const validaSchema = (schema) => {
    return  async (req, res, next) => {
        const result = schema.validate(req.body)
        if (result.error) {
            return res.status(400).json(
                {
                    errores : result.error.details.map( error=> ( {
                        error: error.message
                    })
                )}  
            )
        }
        next()
    }

}

middleware.validaSchema = validaSchema;

module.exports = middleware;

