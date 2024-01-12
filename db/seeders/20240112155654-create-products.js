'use strict';
const { faker } = require('@faker-js/faker');
const { PRODUCT_TABLE } = require('../models/product.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const createProduct = (categoriesArray) => ({
      name: faker.commerce.productName(),
      price: faker.commerce.price({ min: 10, dec: 0 }),
      description: faker.commerce.productDescription(),
      image: faker.image.url(),
      created_at: new Date(),
      category_id: faker.helpers.arrayElement(categoriesArray),
    });
    const categories = await queryInterface.sequelize.query(
      'SELECT id FROM categories',
    );
    const categoriesArray = categories[0].map((category) => category.id);
    const products = Array.from({ length: 100 }, () =>
      createProduct(categoriesArray),
    );

    await queryInterface.bulkInsert(PRODUCT_TABLE, products, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(PRODUCT_TABLE, null, {});
  },
};
