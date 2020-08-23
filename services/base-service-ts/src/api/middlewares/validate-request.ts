import * as wrapAsync from '../../helpers/async/wrap-async';
import ErrorResponse from '../../helpers/error/structure/error-response';

exports.validateFunction = (req, res, next) => {
  next();
};

// Wrapping all functions for error catching
wrapAsync.wrapAsyncFunctions(this);
