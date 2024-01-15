'use strict';
const { faker } = require('@faker-js/faker');
const { ORDER_PRODUCT_TABLE } = require('../models/order-product.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const createOrderProduct = (ordersArray, productsArray) => ({
      order_id: faker.helpers.arrayElement(ordersArray),
      amount: faker.number.int({ min: 1, max: 5 }),
      product_id: faker.helpers.arrayElement(productsArray),
      created_at: new Date(),
    });
    const orders = await queryInterface.sequelize.query(
      'SELECT id FROM orders',
    );
    const ordersArray = orders[0].map((order) => order.id);
    const products = await queryInterface.sequelize.query(
      'SELECT id FROM products',
    );
    const productsArray = products[0].map((product) => product.id);
    const ordersProducts = Array.from({ length: 50 }, () =>
      createOrderProduct(ordersArray, productsArray),
    );

    await queryInterface.bulkInsert(ORDER_PRODUCT_TABLE, ordersProducts, {
      ignoreDuplicates: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(ORDER_PRODUCT_TABLE, null, {});
  },
};
