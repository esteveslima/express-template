import express from 'express';
import * as aaaRouter from './aaa';
import * as bbbRouter from './bbb';

export default () : express.Router => {
  const router = express.Router();

  // Server status response
  router.get('/public/status', (req, res/* , next */) : void => {
    res.status(200).json({ Status: true });
  });

  // Assigning routes
  aaaRouter.joinToRouter(router);
  bbbRouter.joinToRouter(router);

  // Not found(404) response
  router.all('*', (req, res/* , next */) : void => {
    res.status(404).json({ Status: false, message: 'Route not found' });
  });

  return router;
};
