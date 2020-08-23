const dotenv = require('../services/env/dotenv');
const expressLoader = require('./express/express');
const mongooseLoader = require('./mongoose/mongoose');

module.exports = async () => {
  // Envirnoment Variables
  dotenv.setupDotenv();

  // Load Express with its packages
  const expressApp = expressLoader();

  // Load Mongoose connection
  mongooseLoader.connect();

  // Another loads...

  return expressApp;
};
