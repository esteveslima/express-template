import express from 'express';
import * as cors from '../../services/security/cors';
import * as helmet from '../../services/security/helmet';
import * as hpp from '../../services/security/hpp';
import * as xssClean from '../../services/security/xss-clean';
import * as rateLimiter from '../../services/security/rate-limit';
import * as morgan from '../../services/log/morgan';

import router from '../../api/routes/router';
import errorHandler from '../../services/error/error-handler';

export default () : express.Application => {
  const app = express();

  // Body parser
  app.use(express.json());
  // app.use(express.urlencoded({ extended: true }));

  // Security packages(may be unnecessary if defined in a reverse proxy server like nginx)
  app.use(cors.setupCors());
  app.use(helmet.setupHelmet());
  app.use(xssClean.setupXssClean());
  app.use(hpp.setupHpp());
  // app.use(rateLimiter.setupGeneralRateLimit());

  // Requests logger package
  app.use(morgan.setupMorgan());

  // Router
  app.use(router());

  // Middleware error handler
  app.use(errorHandler);

  return app;
};
