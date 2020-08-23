import type { RequestHandler } from 'express'; // eslint-disable-line no-unused-vars
import * as wrapAsync from '../../helpers/async/wrap-async';
import ErrorResponse from '../../helpers/error/structure/error-response';

export const validateFunction : RequestHandler = (req, res, next) : void => {
  next();
};

// Wrapping all functions for error catching
wrapAsync.wrapAsyncFunctions(this);
