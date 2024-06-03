'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profesor extends Model {
    static associate(models) {
      
    }
  }
  Profesor.init({
    nombre: DataTypes.STRING,
    fechaNacimiento: DataTypes.DATE,
    legajo: DataTypes.INTEGER,
    activo: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Profesor',
  });
  return Profesor;
};