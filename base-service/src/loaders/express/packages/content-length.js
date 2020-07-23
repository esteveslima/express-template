const contentLength = require('express-content-length-validator');

exports.setupContentLenght = () => {
  const validate = {
    max: 999,
    status: 400,
    message: 'Excessive payload size',
  };

  return contentLength.validateMax(validate);
};
