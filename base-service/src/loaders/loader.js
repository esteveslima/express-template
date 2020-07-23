const dotenv = require('dotenv');
const expressLoader = require('./express/express');

exports.load = async () => {
  // Envirnoment Variables
  dotenv.config({ path: `${__dirname}/./../config/.env` });

  // Load Express with its packages
  const expressApp = expressLoader();

  // Another loads...

  return expressApp;
};
