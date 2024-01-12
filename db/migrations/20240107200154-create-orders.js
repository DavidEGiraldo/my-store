'use strict';

const { ORDER_TABLE, OrderSchema } = require('../models/order.model');
const { total, ...Schema } = OrderSchema;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(ORDER_TABLE, Schema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(ORDER_TABLE);
  },
};
