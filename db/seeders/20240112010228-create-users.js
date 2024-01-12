'use strict';
const { faker } = require('@faker-js/faker');
const { USER_TABLE } = require('../models/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const createUser = () => ({
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: faker.helpers.arrayElement(['customer', 'admin']),
      created_at: new Date(),
    });
    const users = faker.helpers.multiple(createUser, { count: 10 });

    await queryInterface.bulkInsert(USER_TABLE, users, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(USER_TABLE, null, {});
  },
};
