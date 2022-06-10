'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transport', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      destinationId: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.FLOAT
      },
      departureAt: {
        type: Sequelize.DATE
      },
      arrivedAt: {
        type: Sequelize.DATE
      },
      price: {
        type: Sequelize.FLOAT
      },
      reserved: {
        type: Sequelize.BOOLEAN
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transport');
  }
};