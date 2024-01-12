const { Sequelize } = require('sequelize');

const { config } = require('../config/config');
const setupModels = require('../db/models/index');

const sequelize = new Sequelize(config.dbUrl, {
  dialect: 'postgres',
});

setupModels(sequelize);

module.exports = sequelize;
