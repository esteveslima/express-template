const sanitize = require('express-mongo-sanitize');

exports.setupMongoSanitizer = () => {
  const mongoSanitizer = sanitize();
  return mongoSanitizer;
};
