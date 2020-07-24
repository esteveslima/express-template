const asyncHandler = require('../middlewares/async/asyncHandler');
const ErrorResponse = require('../middlewares/error/ErrorResponse');

exports.controllerFunction = asyncHandler(async (req, res) => {
  throw new ErrorResponse(ErrorResponse.errorCodes.WRONG_PARAMETERS, 'result example');
});
