'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Activity.belongsTo(models.Travel)
    }
  }
  Activity.init({
    travelId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    date: DataTypes.DATE,
    peopleNumber: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    price: DataTypes.FLOAT,
    order: DataTypes.INTEGER,
    reserved: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Activity',
    freezeTableName: true,
    timestamps: false
  });
  return Activity;
};