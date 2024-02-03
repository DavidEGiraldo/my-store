const { Router } = require('express');
const passport = require('passport')

const {
  getOrderSchema,
  addItemSchema,
  updateItemSchema,
  getItemSchema,
} = require('../schemas/order.schema');
const validatorHandler = require('../middlewares/validator.handler');
const { checkOwner, checkRoles } = require('../middlewares/auth.handler')
const OrderService = require('../services/order.service');

const router = Router();
const service = new OrderService();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const orders = await service.find();
      res.json(orders);
    } catch (error) {
      next(error);
    }
});

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getOrderSchema, 'params'),
  checkOwner('Order'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/:id/products',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(addItemSchema, 'body'),
  checkOwner('Order'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const newItem = await service.addItem({ orderId: id, ...data });
      res.json(newItem);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id/products/:productId',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getItemSchema, 'params'),
  validatorHandler(updateItemSchema, 'body'),
  checkOwner('Order'),
  async (req, res, next) => {
    try {
      const { id: orderId, productId } = req.params;
      const data = req.body;
      const newItem = await service.updateItem(orderId, productId, data);
      res.json(newItem);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getOrderSchema, 'params'),
  checkOwner('Order'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedOrder = await service.delete(id);
      res.json(deletedOrder);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id/products/:productId',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getItemSchema, 'params'),
  checkOwner('Order'),
  async (req, res, next) => {
    try {
      const { id: orderId, productId } = req.params;
      const deletedItem = await service.deleteItem(orderId, productId);
      res.json(deletedItem);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
