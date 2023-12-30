const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(20);
const category = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();
const isBlocked = Joi.boolean();

const createProductSchema = Joi.object({
  name: name.required(),
  category: category.required(),
  price: price.required(),
  image: image.required(),
  isBlocked: isBlocked.required(),
});

const updateProductSchema = Joi.object({
  name: name,
  category: category,
  price: price,
  image: image,
  isBlocked: isBlocked,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema };
