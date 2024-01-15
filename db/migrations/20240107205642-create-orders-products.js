'use strict';

const {
  ORDER_PRODUCT_TABLE,
  OrderProductSchema,
} = require('../models/order-product.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema);
    await queryInterface.addIndex(
      ORDER_PRODUCT_TABLE,
      ['order_id', 'product_id'],
      {
        unique: true,
        name: 'orderProductIndex',
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
  },
};
