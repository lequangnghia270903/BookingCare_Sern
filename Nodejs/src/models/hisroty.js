'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  History.init({
    patienId: DataTypes.INTEGER,
    doctorId: DataTypes.BOOLEAN,
    description: DataTypes.TEXT,
    files: DataTypes.TEXT,//luu duong linh cua file
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};