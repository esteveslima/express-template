const cookieParser = require('cookie-parser');

exports.setupCookieParser = () => {
  const parser = cookieParser();
  return parser;
};
