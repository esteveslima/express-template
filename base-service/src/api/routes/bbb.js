const express = require('express');

exports.joinRouter = (mainRouter) => {
  const bbbRouter = express.Router();
  mainRouter.use('/bbb', bbbRouter);

  bbbRouter.get('/', (req, res) => res.send('get'));
  bbbRouter.post('/', (req, res) => res.send('post'));
  bbbRouter.put('/', (req, res) => res.send('put'));
  bbbRouter.delete('/', (req, res) => res.send('delete'));
};
