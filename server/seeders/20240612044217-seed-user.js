'use strict';
const {hash} = require('../helpers/bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const user = [
      {
        username: "test1",
        email: "test@gmail.com",
        password: hash('123'),
        fullName: "test 1234",
        gender: "female",
        dob: "2022-11-01",
        imgUrl: "https://i.pinimg.com/736x/3e/66/aa/3e66aa5ecb96e60573a8bca17799c5d1.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: "test 2",
        email: "test2@gmail.com",
        password: hash('123'),
        fullName: "test 1234",
        gender: "female",
        dob: "2022-11-01",
        imgUrl: "https://i.pinimg.com/736x/3e/66/aa/3e66aa5ecb96e60573a8bca17799c5d1.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert("Users", user, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {})
  }
};
