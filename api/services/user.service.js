const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom')

const getConnection = require('../libs/postgres')

class UserService {
  constructor() {
    this.users = [];
    this.generate();
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
    const client = await getConnection()
    const result = await client.query('SELECT * FROM tasks')
    return result.rows;
  }
}

module.exports = UserService;
