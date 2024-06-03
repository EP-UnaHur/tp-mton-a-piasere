const {Carrera, Materia} = require('../db/models')
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
    res.status(200).json(carrera)
    
}
controller.getCareerById = getCareerById;

//Crear una carrera
const createCareer = async (req, res) => {
    const carrera = await Carrera.create(req.body)
    res.status(201).json(carrera)
}
controller.createCareer = createCareer

// Obtener todas las materias de una carrera
const obtenerMateriasPorCarrera = async (req, res) => {
    const carreraId = req.params.id;
    const carrera = await Carrera.findByPk(carreraId, {
        include:[{
            model: Materia,
            as: 'materias'
        }]
    });
    res.status(200).json(carrera);
}

controller.obtenerMateriasPorCarrera = obtenerMateriasPorCarrera;

//Crea una materia dentro de una carrera
const crearMateriaEnCarrera = async (req, res) => {
    const carreraId = req.params.id;
    const { nombre, cuatrimestral, anio } = req.body;

    try {
    const materia = await Materia.create({ nombre, cuatrimestral, anio, carreraId });
        res.status(201).json(materia);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la materia', error });
    }
};

controller.crearMateriaEnCarrera = crearMateriaEnCarrera;

module.exports = controller