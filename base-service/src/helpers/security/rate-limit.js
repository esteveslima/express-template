const rateLimit = require('express-rate-limit');
const ErrorResponse = require('../error/structure/error-response');

module.exports.setupGeneralRateLimit = () => {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    handler: () => {
      throw new ErrorResponse(ErrorResponse.errorCodes.TOO_MANY_REQUESTS, 'too many requests');
    },
  });
  return limiter;
};

module.exports.setupFileUploadRateLimit = () => {
  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    handler: () => {
      throw new ErrorResponse(ErrorResponse.errorCodes.TOO_MANY_UPLOADS, 'too many uploads');
    },
  });
  return limiter;
};
