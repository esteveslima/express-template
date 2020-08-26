const express = require('express');
const userRouter = require('./user');
const authRouter = require('./auth');

const jwtAuth = require('../../services/auth/jwt');
const adjustMiddleware = require('../middlewares/adjust-request');

module.exports = () => {
  const router = express.Router();

  // Server status response
  router.get('/public/status', (req, res/* , next */) => {
    res.status(200).json({ Status: true });
  });

  // Used by nginx to make a subrequest-authentication before reverse proxying to the target server
  router.all('/authorization', jwtAuth.authorization, (req, res) => {
    res.status(200).json({ Status: true });
  });
  // (The auth bellow should be enabled if nginx subrequest-authentication is not configured)
  // Router authorization middleware, for routes not marked as public
  // router.all(/^((?!\/public\/).)*$/i, jwtAuth.authorization, adjustMiddleware.appendUser);
  // Could revert logic and apply to all routes marked as private
  // router.all(/(\/private\/)/i, jwtAuth.authorization, adjustMiddleware.appendUser);

  // Assigning routes
  userRouter.joinToRouter(router);
  authRouter.joinToRouter(router);

  // Not found(404) response
  router.all('*', (req, res/* , next */) => {
    res.status(404).json({ Status: false, message: 'Route not found' });
  });

  return router;
};
