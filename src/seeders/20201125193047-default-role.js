'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('roles', [{
        name: 'default',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', {name: 'default'}, {});
  }
};
