'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Destination', 'departureCityLat', {allowNull: true, type: Sequelize.FLOAT});
    await queryInterface.addColumn('Destination', 'departureCityLong', {allowNull: true, type: Sequelize.FLOAT});
    await queryInterface.addColumn('Destination', 'arrivedCityLat', {allowNull: true, type: Sequelize.FLOAT});
    await queryInterface.addColumn('Destination', 'arrivedCityLong', {allowNull: true, type: Sequelize.FLOAT});
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.dropTable('Travel');
  }
};
