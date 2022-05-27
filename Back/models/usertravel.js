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
      UserTravel.belongsTo(models.User);
      UserTravel.belongsTo(models.Travel);
    }
  }
  UserTravel.init({
    userId: DataTypes.INTEGER,
    travelId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserTravel',
    freezeTableName: true,
    timestamps: false
  });
  return UserTravel;
};