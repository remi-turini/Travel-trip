'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Airport extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

        }
    }
    Airport.init({
        code: DataTypes.STRING,
        name: DataTypes.STRING,
        cityCode: DataTypes.STRING,
        cityName: DataTypes.STRING,
        countryName: DataTypes.STRING,
        countryCode: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Airport',
        freezeTableName: true,
        timestamps: false
    });
    return Airport;
};