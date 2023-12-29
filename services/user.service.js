const { faker } = require('@faker-js/faker');

class UserService {
  constructor() {
    this.users = []
    this.generate()
  }

  generate() {
    const createUser = () => ({
      name: faker.person.fullName(),
      birthdate: faker.date.birthdate(),
      city: faker.location.city()
    })

    this.users = faker.helpers.multiple(createUser, {count: 10})
  }

  find() {
    return this.users
  }
}

module.exports = UserService
