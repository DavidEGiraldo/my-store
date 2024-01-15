const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1);

const createOrderSchema = Joi.object({
  customerId: customerId.required(),
});

const updateOrderSchema = Joi.object({
  customerId: customerId,
});

const getOrderSchema = Joi.object({
  id: id.required(),
});

const addItemSchema = Joi.object({
  productId: productId.required(),
  amount: amount.required(),
});

const updateItemSchema = Joi.object({
  amount: amount.required(),
});

const getItemSchema = Joi.object({
  orderId: id.required(),
  productId: productId.required(),
});

module.exports = {
  createOrderSchema,
  updateOrderSchema,
  getOrderSchema,
  addItemSchema,
  updateItemSchema,
  getItemSchema,
};
