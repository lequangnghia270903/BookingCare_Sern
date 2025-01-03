'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      //bulkInsert chen nhieu ban ghi 1 luc vao db
      {
        email: 'admin@gmail.com',
        password: '123456',//plain text
        firstName: 'Nghia',
        lastName: 'Le',
        address: 'Hue',
        phoneNumber: '0367287058',
        gender: '1',
        roleId: 'R1',
        positionId: 'Master',
        image: '..',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
