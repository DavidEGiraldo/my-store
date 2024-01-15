const { Router } = require('express');

const {
  createOrderSchema,
  updateOrderSchema,
  getOrderSchema,
  addItemSchema,
  updateItemSchema,
  getItemSchema,
} = require('../schemas/order.schema');
const validatorHandler = require('../middlewares/validator.handler');
const OrderService = require('../services/order.service');

const router = Router();
const service = new OrderService();

router.get('/', async (req, res, next) => {
  try {
    const orders = await service.find();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
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
  '/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newOrder = await service.create(data);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/:id/products',
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(addItemSchema, 'body'),
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
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedOrder = await service.update(id, body);
      res.json(updatedOrder);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:orderId/products/:productId',
  validatorHandler(getItemSchema, 'params'),
  validatorHandler(updateItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const { orderId, productId } = req.params;
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
  validatorHandler(getOrderSchema, 'params'),
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
  '/:orderId/products/:productId',
  validatorHandler(getItemSchema, 'params'),
  async (req, res, next) => {
    try {
      const { orderId, productId } = req.params;
      const deletedItem = await service.deleteItem(orderId, productId);
      res.json(deletedItem);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
