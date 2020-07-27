const wrapAsync = require('../../helpers/async/wrap-async');
const ErrorResponse = require('../../helpers/error/structure/error-response');

exports.registredErrorExample = (req, res) => {
  throw new ErrorResponse(ErrorResponse.errorCodes.WRONG_PARAMETERS, 'registredErrorExample');
};

exports.unregistredErrorExample = (req, res) => {
  console.log(not_declared_variable);
};

// Wrapping all functions for error catching
wrapAsync.wrapAsyncFunctions(this);
