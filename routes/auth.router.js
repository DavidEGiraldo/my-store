const express = require('express');
const passport = require('passport');

const {
  sendEmailSchema,
  changePasswordSchema,
} = require('../schemas/user.schema');
const validatorHandler = require('../middlewares/validator.handler');
const AuthService = require('../services/auth.service');

const router = express.Router();
const service = new AuthService();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const { user } = req;
      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/recovery',
  validatorHandler(sendEmailSchema, 'body'),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const url = `${req.protocol}://${req.get('host')}`;
      const result = await service.sendRecovery(email, url);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/change-password',
  validatorHandler(changePasswordSchema, 'body'),
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const result = await service.changePassword(token, newPassword);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
