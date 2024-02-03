const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { config } = require('../config/config');

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

function checkRoles(...roles) {
  return (req, res, next) => {
    const { role } = req.user;
    if (roles.includes(role)) {
      next();
    } else {
      next(boom.forbidden('Admin permissions required'));
    }
  };
}

function checkOwner(model) {
  return async (req, res, next) => {
    try {
      const { user } = req;
      const { id } = req.params;
      const resource = await models[model].findByPk(id, {
        include: [
          {
            association: 'customer',
            include: ['user'],
          },
        ],
      });
      if (resource.customer.user.id === user.sub || user.role === 'admin') {
        next();
      } else {
        next(
          boom.forbidden(`You don't have permissions to edit this resource`),
        );
      }
    } catch (error) {
      next(error);
    }
  };
}

module.exports = { checkApiKey, checkRoles, checkOwner };
