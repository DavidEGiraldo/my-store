const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const pool = require('../libs/postgres.pool');

class UserService {
  constructor() {
    this.users = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  generate() {
    const createUser = () => ({
      name: faker.person.fullName(),
      birthdate: faker.date.birthdate(),
      city: faker.location.city(),
    });

    this.users = faker.helpers.multiple(createUser, { count: 10 });
  }

  async find() {
    const query = 'SELECT * FROM tasks';
    const result = await this.pool.query(query);
    return result.rows;
  }
}

module.exports = UserService;
