const dotenv = require('../helpers/dotenv/dotenv');
const expressLoader = require('./express/express');
const mongooseLoader = require('./mongoose/mongoose');

exports.load = async () => {
  // Envirnoment Variables
  dotenv.setupDotenv();

  // Load Express with its packages
  const expressApp = expressLoader();

  // Load Mongoose connection
  mongooseLoader.connect();

  // Another loads...

  return expressApp;
};
