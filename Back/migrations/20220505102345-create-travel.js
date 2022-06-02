'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Travel', {
      id: {
        allowNull: false,
        autoIncrement: true,

        primaryKey: true,
        type: Sequelize.INTEGER
      },
      startDate: {
        allowNull: true,
        type: Sequelize.DATE
      },
      endDate: {
        allowNull: true,
        type: Sequelize.DATE
      },
      price: {
        allowNull: true,
        type: Sequelize.FLOAT
      },
      peopleNumber: {
        allowNull: true,
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Travel');
  }
};