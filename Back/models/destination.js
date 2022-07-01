'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Destination extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Destination.belongsTo(models.Travel);
      Destination.hasOne(models.Transport, {
        foreignKey: 'destinationId'
      });
    }
  }
  Destination.init({
    travelId: DataTypes.INTEGER,
    departureCity: DataTypes.STRING,
    departureCityLat: DataTypes.FLOAT,
    departureCityLong: DataTypes.FLOAT,
    arrivedCity: DataTypes.STRING,
    arrivedCityLat: DataTypes.FLOAT,
    arrivedCityLong: DataTypes.FLOAT,
    departureDate: DataTypes.DATE,
    arrivedDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Destination',
    freezeTableName: true,
    timestamps: false
  });
  return Destination;
};