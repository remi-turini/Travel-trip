'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Destination', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      travelId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Travel',
          key: 'id',
        },
      },
      departureCity: {
        allowNull: true,
        type: Sequelize.STRING
      },
      arrivedCity: {
        allowNull: true,
        type: Sequelize.STRING
      },
      departureDate: {
        allowNull: true,
        type: Sequelize.DATE
      },
      arrivedDate: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Destination');
  }
};