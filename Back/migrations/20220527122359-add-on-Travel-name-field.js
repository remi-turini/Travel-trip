'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Travel', 'name', {allowNull: true, type: Sequelize.STRING});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Travel');
  }
};
