'use strict';
const { faker } = require('@faker-js/faker');
const { CATEGORY_TABLE } = require('../models/category.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const createCategory = () => ({
      name: faker.commerce.department(),
      image: faker.image.url(),
      created_at: new Date(),
    });
    const categories = Array.from({ length: 5 }, () => createCategory());

    await queryInterface.bulkInsert(CATEGORY_TABLE, categories, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(CATEGORY_TABLE, null, {});
  },
};
