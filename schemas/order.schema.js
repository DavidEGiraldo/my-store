const Joi = require('joi');

const id = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1);

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
  id: id.required(),
  productId: productId.required(),
});

module.exports = {
  getOrderSchema,
  addItemSchema,
  updateItemSchema,
  getItemSchema,
};
