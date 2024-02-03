const boom = require('@hapi/boom');
const { Op } = require('sequelize');

const { models } = require('../libs/sequelize');

class OrderService {
  constructor() {}

  async create(data) {
    const newOrder = await models.Order.create({customerId: data});
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find() {
    const orders = await models.Order.findAll({
      include: 'customer',
    });
    orders.forEach((order) => {
      delete order.dataValues.items
    })
    return orders
  }

  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ],
    })
    orders.forEach((order) => {
      delete order.dataValues.items
    })
    return orders
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [{ association: 'customer', include: 'user' }, 'items'],
    });
    if (!order) {
      throw boom.notFound('Order not found');
    }
    return order;
  }

  async findOneItem(orderId, productId) {
    const orderProduct = await models.OrderProduct.findOne({
      where: {
        [Op.and]: [{ orderId }, { productId }],
      },
    });
    if (!orderProduct) {
      throw boom.notFound('Product not found in order');
    }
    return orderProduct;
  }

  async update(id, changes) {
    const order = await this.findOne(id);
    const updatedOrder = await order.update(changes);
    return updatedOrder;
  }

  async updateItem(orderId, productId, changes) {
    const orderProduct = await this.findOneItem(orderId, productId);
    const updatedOrderProduct = await orderProduct.update(changes);
    return updatedOrderProduct;
  }

  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();
    return { id };
  }

  async deleteItem(orderId, productId) {
    const orderProduct = await this.findOneItem(orderId, productId);
    await orderProduct.destroy();
    return { orderId, productId };
  }
}

module.exports = OrderService;
