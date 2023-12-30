const { faker } = require('@faker-js/faker');

class CategoryService {
  constructor() {
    this.categories = [];
    this.generate();
  }

  generate() {
    this.categories = faker.helpers.uniqueArray(faker.commerce.department, 5);
  }

  find() {
    return this.categories;
  }
}

module.exports = CategoryService;
