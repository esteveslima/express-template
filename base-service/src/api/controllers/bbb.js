const asyncHandler = require('../../helpers/async/async-handler');
const ErrorResponse = require('../../helpers/error/structure/error-response');

exports.registredErrorExample = asyncHandler(async (req, res) => {
  throw new ErrorResponse(ErrorResponse.errorCodes.WRONG_PARAMETERS, 'registredErrorExample');
});

exports.unregistredErrorExample = asyncHandler(async (req, res) => {
  console.log(not_declared_variable);
});
