const xssClean = require('xss-clean');

exports.setupXssClean = () => {
  const xss = xssClean();
  return xss;
};
