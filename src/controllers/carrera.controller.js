const {Carrera} = require('../db/models')
const controller = {}

//Listar todas las carreras
const getAllCarers = async (req, res) => {
    res.status(200).json(await Carrera.findAll({}))
}
controller.getAllCarrers = getAllCarers

//Buscar carrera por ID
const getCareerById = async(req, res) => {
    const id = req.params.id
    const carrera = await Carrera.findByPk(id)

    if (carrera) {
        res.status(200).json(carrera)
    }
    else {
        res.status(404).json({ message: "Carrera no encontrada" });
    }
}
controller.getCareerById = getCareerById;

//Crear una carrera
const createCareer = async (req, res) => {
    const carrera = await Carrera.create(req.body)
    res.status(201).json(carrera)
}
controller.createCareer = createCareer

module.exports = controller