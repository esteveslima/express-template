import express from 'express';
import * as cors from '../../helpers/security/cors';
import * as helmet from '../../helpers/security/helmet';
import * as hpp from '../../helpers/security/hpp';
import * as xssClean from '../../helpers/security/xss-clean';
import * as rateLimiter from '../../helpers/security/rate-limit';
import * as morgan from '../../helpers/log/morgan';

import router from '../../api/routes/router';
import errorHandler from '../../helpers/error/error-handler';

export default () : express.Application => {
  const app = express();

  // Body parser
  app.use(express.json());
  // app.use(express.urlencoded({ extended: true }));

  // Security packages
  app.use(cors.setupCors());
  app.use(helmet.setupHelmet());
  app.use(xssClean.setupXssClean());
  app.use(hpp.setupHpp());
  app.use(rateLimiter.setupGeneralRateLimit());

  // Requests logger package
  app.use(morgan.setupMorgan());

  // Router
  app.use(router());

  // Middleware error handler
  app.use(errorHandler);

  return app;
};
