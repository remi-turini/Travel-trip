'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTravel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserTravel.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'users'
      });
      UserTravel.belongsTo(models.Travel, {
        foreignKey: 'travelId',
        as: 'travels'
      });
    }
  }
  UserTravel.init({
    userId: DataTypes.INTEGER,
    travelId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserTravel',
  });
  return UserTravel;
};