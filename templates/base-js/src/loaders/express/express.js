const express = require('express');
const cors = require('../../services/security/cors');
const helmet = require('../../services/security/helmet');
const hpp = require('../../services/security/hpp');
const xssClean = require('../../services/security/xss-clean');
const rateLimiter = require('../../services/security/rate-limit');
const morgan = require('../../services/log/morgan');

const router = require('../../api/routes/router');
const errorHandler = require('../../services/error/error-handler');

module.exports = () => {
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
