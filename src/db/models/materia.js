'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Materia extends Model {
    
    static associate(models) {
      Materia.belongsTo(models.Carrera, {
        foreignKey: 'carreraId',
        as: 'carrera'
      });
    }

    static associate(models) {
      Materia.hasMany(models.Curso, {
        foreignKey: 'materiaId',
        as: 'cursos'
      });
    }
  }
  Materia.init({
    nombre: DataTypes.STRING,
    cuatrimestral: DataTypes.BOOLEAN,
    anio: DataTypes.INTEGER,
    carreraId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Materia',
  });
  return Materia;
};