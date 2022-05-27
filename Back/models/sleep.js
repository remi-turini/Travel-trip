'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sleep extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sleep.belongsTo(models.Travel)
    }
  }
  Sleep.init({
    travelId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    typeOfRoom: DataTypes.STRING,
    date: DataTypes.DATE,
    peopleNumber: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    price: DataTypes.FLOAT,
    order: DataTypes.INTEGER,
    reserved: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Sleep',
    freezeTableName: true,
    timestamps: false
  });
  return Sleep;
};