const express = require('express');
const userRouter = require('./user');
const bbbRouter = require('./bbb');

module.exports = () => {
  const router = express.Router();

  // Assigning routes
  userRouter.joinToRouter(router);
  bbbRouter.joinToRouter(router);

  // Server status response
  router.get('/status', (req, res/* , next */) => {
    res.status(200).json({ Status: true });
  });

  // Not found(404) response
  router.all('*', (req, res/* , next */) => {
    res.status(404).json({ Status: false, message: 'Route not found' });
  });

  return router;
};
