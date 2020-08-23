const express = require('express');
const aaa = require('../controllers/aaa');

const rateLimiter = require('../../services/security/rate-limit');

exports.joinToRouter = (mainRouter) => {
  const aaaRouter = express.Router();
  mainRouter.use('/aaa', aaaRouter);

  aaaRouter.get('/', (req, res) => res.send('get'));
  aaaRouter.post('/', (req, res) => res.send('post'));
  aaaRouter.put('/', (req, res) => res.send('put'));
  aaaRouter.delete('/', (req, res) => res.send('delete'));

  aaaRouter.post('/imageUploadExample', rateLimiter.setupFileUploadRateLimit(), aaa.imageUploadExample);
  aaaRouter.post('/emailExample', aaa.emailExample);
};
