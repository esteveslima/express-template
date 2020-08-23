// Class wraping error responses
const errorCodes = require('./error-codes');

class ErrorResponse extends Error {
  constructor(error, result) {
    super();
    this.error = error;
    this.result = result;
  }
}

ErrorResponse.errorCodes = errorCodes;

ErrorResponse.parse = (err) => {
  if (err instanceof ErrorResponse) {
    return { ...err };
  }

  // If it is not a manually thrown ErrorResponse object...
  // tests the error and parse to a proper ErrorResponse object
  const errorCode = errorCodes.INTERNAL_SERVER_ERROR;
  const errorResult = `${err}`;

  /* switch (true) {
    case (err.name === ''): {

      break;
    }
    case (err.name === ' '): {

      break;
    }
    default: {
      errorCode = { ...errorCodes.INTERNAL_SERVER_ERROR };
      errorResult = `${err}`;
    }
  } */

  return new ErrorResponse(errorCode, errorResult);
};

module.exports = ErrorResponse;
