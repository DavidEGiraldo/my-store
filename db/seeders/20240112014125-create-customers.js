'use strict';
const { faker } = require('@faker-js/faker');
const { CUSTOMER_TABLE } = require('../models/customer.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const createCustomer = () => ({
      name: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phone: faker.phone.number(),
      created_at: new Date(),
      user_id: null,
    });
    const customers = Array.from({ length: 10 }, () => createCustomer());
    const usersId =
      await queryInterface.sequelize.query(`SELECT id FROM users`);
    customers.forEach((customer, index) => {
      customer.user_id = usersId[0][index].id;
    });

    await queryInterface.bulkInsert(CUSTOMER_TABLE, customers, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(CUSTOMER_TABLE, null, {});
  },
};
