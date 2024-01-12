'use strict';
const { faker } = require('@faker-js/faker');
const { ORDER_TABLE } = require('../models/order.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const createOrder = (customersArray) => ({
      customer_id: faker.helpers.arrayElement(customersArray),
      created_at: new Date(),
    });
    const customers = await queryInterface.sequelize.query(
      'SELECT id FROM customers',
    );
    const customersArray = customers[0].map((customer) => customer.id);
    const orders = Array.from({ length: 15 }, () =>
      createOrder(customersArray),
    );

    await queryInterface.bulkInsert(ORDER_TABLE, orders, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(ORDER_TABLE, null, {});
  },
};
