import type { RequestHandler } from 'express'; // eslint-disable-line no-unused-vars
import * as wrapAsync from '../../services/async/wrap-async';
import ErrorResponse from '../../services/error/structure/error-response';

export const registredErrorExample : RequestHandler = (req, res) : never => {
  throw new ErrorResponse(ErrorResponse.errorCodes.WRONG_PARAMETERS, 'registredErrorExample');
};

export const unregistredErrorExample : RequestHandler = (req, res) : void => {
  // Generates an unexpected error
  const pi = 3.14159;
  pi.toFixed(100000);
};

// Wrapping all functions for error catching
wrapAsync.wrapAsyncFunctions(this);
