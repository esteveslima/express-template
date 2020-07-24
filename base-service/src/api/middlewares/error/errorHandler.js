const ErrorResponse = require('./ErrorResponse');

module.exports = (err, req, res, next) => {
  let errorResponse = { ...err };
  // If not a ErrorResponse object, tests the error and assign to a proper ErrorResponse object
  if (!(err instanceof ErrorResponse)) {
    /* if (err) {

    } else if (err) {

    } else if (err) {

    } else { */
    errorResponse = new ErrorResponse(ErrorResponse.errorCodes.INTERNAL_SERVER_ERROR, `${err}`);
    // }
  }

  // Logging for the error
  if (process.env.NODE_ENV !== 'production') {
    console.error(`Detected Error [${errorResponse.error.errorCode}]. Result: ${JSON.stringify(errorResponse.result)}`);
  } else if (process.env.LOGGING === 'true') {
    // write log file with winston
  }

  // Response based on the ErrorResponse object
  res.status(errorResponse.error.httpCode).json({
    Status: false,
    Error: errorResponse.error.errorCode,
    Message: errorResponse.error.message,
  });
};
