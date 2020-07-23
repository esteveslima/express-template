const express = require('express');
const aaaRouter = require('./aaa');
const bbbRouter = require('./bbb');

module.exports = () => {
  const router = express.Router();

  // Assigning Routes
  aaaRouter.joinRouter(router);
  bbbRouter.joinRouter(router);

  // Custom 404 response
  router.all('*', (req, res) => {
    res.status(404).send('404');
  });

  return router;
};
