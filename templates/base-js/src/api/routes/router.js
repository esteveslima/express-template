const express = require('express');
const aaaRouter = require('./aaa');
const bbbRouter = require('./bbb');

module.exports = () => {
  const router = express.Router();

  // Server status response
  router.get('/status', (req, res/* , next */) => {
    res.status(200).json({ Status: true });
  });

  // Assigning routes
  aaaRouter.joinToRouter(router);
  bbbRouter.joinToRouter(router);

  // Not found(404) response
  router.all('*', (req, res/* , next */) => {
    res.status(404).json({ Status: false, message: 'Route not found' });
  });

  return router;
};
