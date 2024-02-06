const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('./../config/config');

const UserService = require('./user.service');
const service = new UserService();

class AuthService {
  constructor() {}

  async getUser(email, password) {
    const user = await service.findByEmail(email);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized('Invalid credentials');
    }
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token,
    };
  }

  async sendRecovery(email, url) {
    const user = await service.findByEmail(email);
    if (user.recoveryToken) {
      jwt.verify(user.recoveryToken, config.jwtRecoverySecret, (err) => {
        if (!err) {
          throw boom.unauthorized('You already have an active token');
        }
      });
    }
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtRecoverySecret, {
      expiresIn: '15min',
    });
    const link = `${url}/recovery?token=${token}`;
    await service.update(user.id, { recoveryToken: token });
    const mail = {
      from: config.mailerUser,
      to: user.email,
      subject: 'Password Reset Request',
      text: `
      Hi ${user.customer?.name || user.email.split('@')[0]},

      We received a request to reset your password. Please follow the link below to create a new password:

      ${link}

      If you didn't make this request, you can ignore this email.

      Thank you,
      My-Store Team
      `,
      html: `
      <p>Hi <b>${user.customer?.name || user.email.split('@')[0]}</b>,</p>
      <p>We received a request to reset your password. Please follow the link below to create a new password:</p>
      <p><b>${link}</b></p>
      <p>If you didn't make this request, you can ignore this email.</p>
      <p>Thank you,<br>My-Store Team</p>`,
    };
    const response = await this.sendMail(mail);
    return response;
  }

  async changePassword(token, newPassword) {
    const payload = jwt.verify(
      token,
      config.jwtRecoverySecret,
      (err, decoded) => {
        if (err) {
          throw boom.unauthorized('Invalid token');
        }
        return decoded;
      },
    );
    const user = await service.findById(payload.sub);
    if (user.dataValues.recoveryToken !== token) {
      throw boom.unauthorized();
    }
    const hash = await bcrypt.hash(newPassword, 10);
    await service.update(user.id, { recoveryToken: null, password: hash });
    return { message: 'Password changed' };
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: config.mailerHost,
      port: 465,
      secure: true,
      auth: {
        user: config.mailerUser,
        pass: config.mailerPass,
      },
    });
    await transporter.sendMail(infoMail);
    return { message: 'Mail sent' };
  }
}

module.exports = AuthService;
