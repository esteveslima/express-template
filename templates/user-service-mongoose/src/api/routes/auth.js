const express = require('express');
const auth = require('../controllers/auth');
const validateMiddleware = require('../middlewares/validate-request');
const rateLimiter = require('../../helpers/security/rate-limit');

exports.joinToRouter = (mainRouter) => {
  const authRouter = express.Router();
  mainRouter.use('/auth', authRouter);

  authRouter.post('/public/login', auth.login);
  authRouter.post('/logout', auth.logout);

  authRouter.post('/public/forgotPassword', rateLimiter.setupRestorePasswordRateLimit(), validateMiddleware.validateEmail, auth.forgotPassword);
  authRouter.post('/public/restorePassword', rateLimiter.setupRestorePasswordRateLimit(), auth.restorePassword);
};
