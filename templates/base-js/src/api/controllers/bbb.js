const wrapAsync = require('../../helpers/async/wrap-async');
const ErrorResponse = require('../../helpers/error/structure/error-response');

exports.registredErrorExample = (req, res) => {
  throw new ErrorResponse(ErrorResponse.errorCodes.WRONG_PARAMETERS, 'registredErrorExample');
};

exports.unregistredErrorExample = (req, res) => {
  // Generates an unexpected error
  const pi = 3.14159;
  pi.toFixed(100000);
};

// Wrapping all functions for error catching
wrapAsync.wrapAsyncFunctions(this);
