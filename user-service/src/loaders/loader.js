const expressLoader = require('./express');

exports.load = async () => {
  const expressApp = expressLoader();

  return expressApp;
};
