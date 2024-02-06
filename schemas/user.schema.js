const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().valid('customer', 'admin');

const name = Joi.string().min(3).max(30);
const lastName = Joi.string();
const phone = Joi.string();

const token = Joi.string().regex(
  /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_.+/=]+$/,
);

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role,
});

const updateUserSchema = Joi.object({
  email: email,
  password: password,
  role: role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

const updateProfileSchema = Joi.object({
  email: email,
  password: password,
  role: role,
  customer: Joi.object({
    name: name,
    lastName: lastName,
    phone: phone,
  }),
});

const sendEmailSchema = Joi.object({
  email: email.required(),
});

const changePasswordSchema = Joi.object({
  newPassword: password.required(),
  token: token.required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
  updateProfileSchema,
  sendEmailSchema,
  changePasswordSchema,
};
