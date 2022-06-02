'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Travel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Travel.belongsToMany(models.User, {
        through: 'UserTravel',
        foreignKey: 'travelId'
      });

      Travel.hasMany(models.Transport, {
        foreignKey: 'travelId'
      });

      Travel.hasMany(models.Activity, {
        foreignKey: 'travelId'
      });

      Travel.hasMany(models.Sleep, {
        foreignKey: 'travelId'
      });

      Travel.hasMany(models.Eat, {
        foreignKey: 'travelId'
      });
    }
  }
  Travel.init({
    name: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    price: DataTypes.FLOAT,
    peopleNumber: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Travel',
    freezeTableName: true,
    timestamps: false
  });

  Travel.prototype.getId = function () {
    return this.getDataValue('id');
  };

  return Travel;
};