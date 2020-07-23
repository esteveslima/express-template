const hpp = require('hpp');

exports.setupHpp = () => {
  const whitelist = [];
  return hpp(whitelist);
};
