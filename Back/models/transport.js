'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transport.belongsTo(models.Destination);
    }
  }
  Transport.init({
    destinationId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    duration: DataTypes.FLOAT,
    departureAt: DataTypes.DATE,
    arrivedAt: DataTypes.DATE,
    price: DataTypes.FLOAT,
    reserved: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Transport',
    freezeTableName: true,
    timestamps: false
  });
  return Transport;
};