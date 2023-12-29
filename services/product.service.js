const { faker } = require('@faker-js/faker');

class ProductService {

  constructor() {
    this.products = []
    this.generate()
  }

  generate() {
    const createProduct = () => ({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      category: faker.commerce.department(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.url(),
    });

    this.products = faker.helpers.multiple(createProduct, {
      count: parseInt(100) || 10,
    });
  }

  create() {

  }

  find() {
    return this.products
  }

  findOne(id) {
    return this.products.find(item => item.id === id)
  }

  update() {

  }

  delete() {

  }
}

module.exports = ProductService
