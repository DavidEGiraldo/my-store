require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  dbUrl: process.env.DB_URL,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  jwtRecoverySecret: process.env.JWT_RECOVERY_SECRET,
  mailerUser: process.env.MAILER_USER,
  mailerPass: process.env.MAILER_PASS,
  mailerHost: process.env.MAILER_HOST,
  urlFront: process.env.URL_FRONT,
};

module.exports = { config };
