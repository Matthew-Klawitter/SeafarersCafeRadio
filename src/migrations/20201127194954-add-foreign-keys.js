'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    queryInterface.addColumn(
      'Backgrounds',
      'moodId',
      {
        type:Sequelize.INTEGER,
        references: {
          model: 'Moods',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    ),
    queryInterface.addColumn(
      'Songs',
      'moodId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Moods',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    ),
    queryInterface.addColumn(
      'Users',
      'roleId',
      {
        type: Sequelize.INTEGER,
        reference: {
          model: 'Roles',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    );
},

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    return Promise.all([
      queryInterface.removeColumn('Backgrounds', 'moodId'),
      queryInterface.removeColumn('Songs', 'moodId'),
      queryInterface.removeColumn('Users', 'roleId')
    ]);
  }
};
