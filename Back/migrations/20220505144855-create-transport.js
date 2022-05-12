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
      travelId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Travel',
          key: 'id',
        },
      },
      type: {
        allowNull: true,
        type: Sequelize.STRING
      },
      duration: {
        allowNull: true,
        type: Sequelize.FLOAT
      },
      startCity: {
        allowNull: true,
        type: Sequelize.STRING
      },
      arrivedCity: {
        allowNull: true,
        type: Sequelize.STRING
      },
      startAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      arrivedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      price: {
        allowNull: true,
        type: Sequelize.FLOAT
      },
      reserved: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transport');
  }
};