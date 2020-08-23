import express from 'express';
import * as aaa from '../controllers/aaa';
import * as rateLimiter from '../../services/security/rate-limit';

export const joinToRouter = (mainRouter: express.Router) : void => {
  const aaaRouter = express.Router();
  mainRouter.use('/aaa', aaaRouter);

  aaaRouter.get('/', (req, res) => res.send('get'));
  aaaRouter.post('/', (req, res) => res.send('post'));
  aaaRouter.put('/', (req, res) => res.send('put'));
  aaaRouter.delete('/', (req, res) => res.send('delete'));

  aaaRouter.post('/imageUploadExample', rateLimiter.setupFileUploadRateLimit(), aaa.imageUploadExample);
  aaaRouter.post('/emailExample', aaa.emailExample);
};
