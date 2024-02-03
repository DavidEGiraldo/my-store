const { Router } = require('express');

const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const categoriesRouter = require('./categories.router');
const customersRouter = require('./customers.router');
const ordersRouter = require('./orders.router');
const loginRouter = require('./auth.router');
const profileRouter = require('./profile.router');

function routerApi(app) {
  const router = Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/customers', customersRouter);
  router.use('/orders', ordersRouter);
  router.use('/auth', loginRouter);
  router.use('/profile', profileRouter);
}

module.exports = routerApi;
