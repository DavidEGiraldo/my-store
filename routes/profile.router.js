const express = require('express');
const passport = require('passport');

const { updateProfileSchema } = require('../schemas/user.schema');
const validatorHandler = require('../middlewares/validator.handler');
const OrderService = require('../services/order.service')
const UserService = require('../services/user.service')

const router = express.Router();
const orderService = new OrderService()
const userService = new UserService()

router.use(passport.authenticate('jwt', { session: false }))

router.get(
  '/',
  async (req, res, next) => {
    try {
      const { user } = req
      const profile = await userService.findOne(user.sub)
      res.json(profile)
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/',
  validatorHandler(updateProfileSchema, 'body'),
  async (req, res, next) => {
    try {
      const { sub: id } = req.user;
      const body = req.body;
      const updatedUser = await userService.update(id, body);
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/orders',
  async (req, res, next) => {
    try {
      const { user } = req
      const orders = await orderService.findByUser(user.sub)
      res.json(orders)
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/orders',
  async (req, res, next) => {
    try {
      const { user } = req
      const newOrder = await orderService.create(user.sub);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
