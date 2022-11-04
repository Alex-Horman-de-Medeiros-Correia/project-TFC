/* 'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
 */

     'use strict';
     module.exports = {
       up: async (queryInterface, Sequelize) => {
         await queryInterface.createTable('users', {
           id: {
             allowNull: false,
             autoIncrement: true,
             primaryKey: true,
             type: Sequelize.INTEGER
           },
           username: {
             type: Sequelize.STRING
           },
           role: {
             type: Sequelize.STRING
           },
           email: {
             type: Sequelize.STRING
           },
           password: {
             type: Sequelize.STRING
           }
         });
       },
       down: async (queryInterface, Sequelize) => {
         await queryInterface.dropTable('users');
       }
     }
     