const express = require('express');
const cors = require('./packages/cors');
const helmet = require('./packages/helmet');
const hpp = require('./packages/hpp');
const xssClean = require('./packages/xss-clean');
const contentLength = require('./packages/content-length');
const rateLimiter = require('./packages/rate-limit');

const morgan = require('./packages/morgan');

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
  app.use(contentLength.setupContentLenght());
  app.use(rateLimiter.setupRateLimit());

  // Logger package
  app.use(morgan.setupMorgan());

  return app;
};
