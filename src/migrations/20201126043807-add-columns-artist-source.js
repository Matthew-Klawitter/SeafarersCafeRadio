'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Songs',
      'artist',
      {
        type:Sequelize.STRING,
        allowNull: true,
      }
    ),
    queryInterface.addColumn(
      'Songs',
      'source',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Songs', 'artist'),
      queryInterface.removeColumn('Songs', 'source')
    ])
  }
};
