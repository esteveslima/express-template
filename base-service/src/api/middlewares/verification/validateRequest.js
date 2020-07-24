const asyncHandler = require('../middlewares/async/asyncHandler');
const ErrorResponse = require('../middlewares/error/ErrorResponse');

exports.validateFunction = asyncHandler(async (req, res, next) => {
  throw new ErrorResponse(ErrorResponse.errorCodes.WRONG_PARAMETERS, 'result example');
});
