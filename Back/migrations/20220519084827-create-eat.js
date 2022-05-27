'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Eat', {
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
      name: {
        allowNull: true,
        type: Sequelize.STRING
      },
      country: {
        allowNull: true,
        type: Sequelize.STRING
      },
      city: {
        allowNull: true,
        type: Sequelize.STRING
      },
      address: {
        allowNull: true,
        type: Sequelize.STRING
      },
      type: {
        allowNull: true,
        type: Sequelize.STRING
      },
      speciality: {
        allowNull: true,
        type: Sequelize.STRING
      },
      rating: {
        allowNull: true,
        type: Sequelize.FLOAT
      },
      date: {
        allowNull: true,
        type: Sequelize.DATE
      },
      peopleNumber: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      photo: {
        allowNull: true,
        type: Sequelize.STRING
      },
      price: {
        allowNull: true,
        type: Sequelize.FLOAT
      },
      order: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      reserved: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Eat');
  }
};