import * as wrapAsync from '../../helpers/async/wrap-async';
import ErrorResponse from '../../helpers/error/structure/error-response';

export const registredErrorExample = (req, res) : never => {
  throw new ErrorResponse(ErrorResponse.errorCodes.WRONG_PARAMETERS, 'registredErrorExample');
};

export const unregistredErrorExample = (req, res) : void => {
  // Generates an unexpected error
  const pi = 3.14159;
  pi.toFixed(100000);
};

// Wrapping all functions for error catching
wrapAsync.wrapAsyncFunctions(this);
