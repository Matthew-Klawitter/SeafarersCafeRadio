'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Backgrounds',
      'author',
      {
        type:Sequelize.STRING,
        allowNull: true,
      }
    ),
    queryInterface.addColumn(
      'Backgrounds',
      'source',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Backgrounds', 'author'),
      queryInterface.removeColumn('Backgrounds', 'source')
    ])
  }
};
