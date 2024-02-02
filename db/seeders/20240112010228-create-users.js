'use strict';
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt')
const { USER_TABLE } = require('../models/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const createUser = () => ({
      email: faker.internet.email(),
      password: bcrypt.hashSync('password', 10),
      role: faker.helpers.weightedArrayElement([
        { weight: 8, value: 'customer' },
        { weight: 2, value: 'admin' },
      ]),
      created_at: new Date(),
    });
    const users = Array.from({ length: 10 }, () => createUser());

    await queryInterface.bulkInsert(USER_TABLE, users, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(USER_TABLE, null, {});
  },
};
