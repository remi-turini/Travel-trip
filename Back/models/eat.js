'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Eat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Eat.belongsTo(models.Travel)
    }
  }
  Eat.init({
    travelId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    type: DataTypes.STRING,
    speciality: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    date: DataTypes.DATE,
    peopleNumber: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    price: DataTypes.FLOAT,
    order: DataTypes.INTEGER,
    reserved: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Eat',
    freezeTableName: true,
    timestamps: false
  });
  return Eat;
};