const contentLength = require('express-content-length-validator');

exports.setupContentLenght = () => {
  const validate = {
    max: 100 * 1024 * 1024, // 10MB
    status: 400,
    message: 'Excessive payload size',
  };

  return contentLength.validateMax(validate);
};
