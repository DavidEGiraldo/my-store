const boom = require('@hapi/boom');
const { Op } = require('sequelize');

const { models } = require('../libs/sequelize');

class ProductService {
  constructor() {}

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    const options = {
      include: 'category',
      where: {},
    };
    const { limit, offset, price, min_price, max_price } = query;
    if (limit && offset) {
      (options.limit = limit), (options.offset = offset);
    }
    if (price) {
      options.where.price = price;
    } else if (min_price || max_price) {
      options.where.price = { [Op.and]: {} };
      if (min_price) options.where.price[Op.and][Op.gte] = min_price;
      if (max_price) options.where.price[Op.and][Op.lte] = max_price;
    }
    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id, { include: 'category' });
    if (!product) {
      throw boom.notFound('Product not found');
    }
    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const updatedProduct = await product.update(changes);
    return updatedProduct;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { id };
  }
}

module.exports = ProductService;
