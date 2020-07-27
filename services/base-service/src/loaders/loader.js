const dotenv = require('../helpers/dotenv/dotenv');
const expressLoader = require('./express/express');

exports.load = async () => {
  // Envirnoment Variables
  dotenv.setupDotenv();

  // Load Express with its packages
  const expressApp = expressLoader();

  // Another loads...

  return expressApp;
};
