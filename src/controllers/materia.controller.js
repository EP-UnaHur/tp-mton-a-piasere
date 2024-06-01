const {Materia} = require('../db/models')
const controller = {}

//Listar todas las materias
const getAllMaterias = async (req, res) => {
    res.status(200).json(await Materia.findAll({}))
}
controller.getAllMaterias = getAllMaterias

//Buscar materia por ID
const getMateriaById = async(req, res) => {
    const id = req.params.id
    const materia = await Materia.findByPk(id)

    if (materia) {
        res.status(200).json(materia)
    }
    else {
        res.status(404).json({ message: "Materia no encontrada" });
    }
}
controller.getMateriaById = getMateriaById;

//Crear materia
const crearMateria = async (req, res) => {
    const cliente = await Materia.create(req.body)
    res.status(201).json(cliente)
}
controller.crearMateria = crearMateria

//Borrar materia
const eliminarMateria = async (req, res) => {
    const id = req.params.id;

    try {
        const materia = await Materia.findByPk(id);
        if (materia) {
            await materia.destroy();
            res.status(200).json({ message: 'Materia eliminada con éxito' });
        } else {
            res.status(404).json({ message: 'Materia no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la materia', error });
    }
};

controller.eliminarMateria = eliminarMateria;

// Obtener todas las materias de una carrera
const obtenerMateriasPorCarrera = async (req, res) => {
    const { carreraId } = req.params;
    const carrera = await Carrera.findByPk(carreraId, {
        include: [{
            model: Materia,
            as: 'materias'
        }]
    });

    if (carrera) {
        res.status(200).json(carrera.materias);
    } else {
        res.status(404).json({ message: 'Carrera no encontrada' });
    }
}

controller.obtenerMateriasPorCarrera = obtenerMateriasPorCarrera;

//Crea un materia dentro de una carrera
const crearMateriaEnCarrera = async (req, res) => {
    const { carreraId } = req.params;
    const { nombre } = req.body;

    try {
        // Verifica si la carrera existe
        const carrera = await Carrera.findByPk(carreraId);
        if (!carrera) {
            return res.status(404).json({ message: 'Carrera no encontrada' });
        }

        // Crea la materia asociada a la carrera
        const materia = await Materia.create({ nombre, carreraId });
        res.status(201).json(materia);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la materia', error });
    }
};

controller.crearMateriaEnCarrera = crearMateriaEnCarrera;


module.exports = controller