const express = require('express');
const cors = require('../../helpers/security/cors');
const helmet = require('../../helpers/security/helmet');
const hpp = require('../../helpers/security/hpp');
const xssClean = require('../../helpers/security/xss-clean');
const rateLimiter = require('../../helpers/security/rate-limit');
const morgan = require('../../helpers/log/morgan');

const router = require('../../api/routes/router');
const errorHandler = require('../../api/middlewares/error/errorHandler');

module.exports = async () => {
  const app = express();

  // Body parser
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

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
