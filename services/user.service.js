const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    const newUser = await models.User.create(data);
    delete newUser.dataValues.password
    delete newUser.dataValues.recoveryToken
    return newUser;
  }

  async find() {
    const users = await models.User.findAll({
      include: 'customer',
    });
    return users;
  }

  async findByEmail(email) {
    const user = await models.User.scope('withPassword').findOne({
      where: { email },
      include: 'customer',
    });
    if (!user) {
      throw boom.unauthorized();
    }
    return user;
  }

  async findById(id) {
    const user = await models.User.scope('withPassword').findByPk(id, {
      include: 'customer',
    });
    if (!user) {
      throw boom.unauthorized();
    }
    return user;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id, { include: 'customer' });
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    await user.update(changes);
    if (changes.customer) {
      const customer = await user.getCustomer();
      await customer.update(changes.customer);
    }
    const updatedUser = await this.findOne(id);
    return updatedUser;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
