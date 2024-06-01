'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carrera extends Model {
    
    static associate(models) {
      Carrera.hasMany(models.Materia, {
        as: 'materias',
        foreignKey: 'carreraId'
      })
    }
  }
  Carrera.init({
    nombre: DataTypes.STRING,
    grado: DataTypes.STRING,
    universidad: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Carrera',
  });
  return Carrera;
};