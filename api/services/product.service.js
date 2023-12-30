const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const createProduct = () => ({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      category: faker.commerce.department(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.url(),
      isBlocked: faker.datatype.boolean(),
    });

    this.products = faker.helpers.multiple(createProduct, {
      count: parseInt(100) || 10,
    });
  }

  async create({ name, category, price, image, isBlocked }) {
    const newProduct = {
      id: faker.string.uuid(),
      name,
      category,
      price,
      image,
      isBlocked,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 5000);
    });
  }

  async findOne(id) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    if (product.isBlocked) {
      throw boom.conflict('Product is blocked');
    }
    return product;
  }

  async update(id, data) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    this.products[index] = { ...this.products[index], ...data };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductService;
