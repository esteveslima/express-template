const express = require('express');
const userRouter = require('./user');
const authRouter = require('./auth');

const jwtAuth = require('../../helpers/auth/jwt');
const adjustMiddleware = require('../middlewares/adjust-request');

module.exports = () => {
  const router = express.Router();

  // Router authorization middleware, for routes not marked as public
  router.all(/^((?!\/public\/).)*$/i, jwtAuth.authorization, adjustMiddleware.appendUser);

  // Assigning routes
  userRouter.joinToRouter(router);
  authRouter.joinToRouter(router);

  // Server status response
  router.get('/public/status', (req, res/* , next */) => {
    res.status(200).json({ Status: true });
  });

  // Not found(404) response
  router.all('*', (req, res/* , next */) => {
    res.status(404).json({ Status: false, message: 'Route not found' });
  });

  return router;
};
