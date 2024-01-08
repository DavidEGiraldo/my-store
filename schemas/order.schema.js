const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const ammount = Joi.number().integer();

const createOrderSchema = Joi.object({
  customerId: customerId.required(),
});

const updateOrderSchema = Joi.object({
  customerId: customerId,
});

const getOrderSchema = Joi.object({
  id: id.required(),
});

const addItemSchema = Joi.object({});

module.exports = {
  createOrderSchema,
  updateOrderSchema,
  getOrderSchema,
};
