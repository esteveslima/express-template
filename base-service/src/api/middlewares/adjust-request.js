const asyncHandler = require('../../helpers/async/async-handler');
const ErrorResponse = require('../../helpers/error/structure/error-response');

exports.adjustFunction = asyncHandler(async (req, res, next) => {
  next();
});
