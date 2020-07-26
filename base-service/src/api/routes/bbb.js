const express = require('express');

const bbb = require('../controllers/bbb');

exports.joinToRouter = (mainRouter) => {
  const bbbRouter = express.Router();
  mainRouter.use('/bbb', bbbRouter);

  bbbRouter.get('/', (req, res) => res.send('get'));
  bbbRouter.post('/', (req, res) => res.send('post'));
  bbbRouter.put('/', (req, res) => res.send('put'));
  bbbRouter.delete('/', (req, res) => res.send('delete'));

  bbbRouter.post('/registredErrorExample', bbb.registredErrorExample);
  bbbRouter.post('/unregistredErrorExample', bbb.unregistredErrorExample);
};
