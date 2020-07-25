const asyncHandler = require('../middlewares/async/asyncHandler');
const ErrorResponse = require('../middlewares/error/ErrorResponse');

exports.registredErrorExample = asyncHandler(async (req, res) => {
  throw new ErrorResponse(ErrorResponse.errorCodes.WRONG_PARAMETERS, 'registredErrorExample');
});

exports.unregistredErrorExample = asyncHandler(async (req, res) => {
  console.log(not_declared_variable);
});
