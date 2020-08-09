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
  // ...tests the error and parse to a proper ErrorResponse object
  // May replace generic responses words to cover all fields
  let errorCode = { ...errorCodes.INTERNAL_SERVER_ERROR };
  let errorResult = `${err}`;

  switch (true) {
    case (err.name === 'MongoError'): {
      switch (err.code) {
        case 11000: {
          errorCode = { ...errorCodes.DUPLICATED_KEY };
          const field = Object.keys(err.keyValue)[0];
          errorCode.message = errorCode.message.replace(/\b(field)\b/gi, field);
          break;
        }
        default: {
          break;
        }
      }
      break;
    }
    case (err.name === 'ValidationError'): {
      errorCode = { ...errorCodes.INVALID_FIELD };
      const validationMessage = err.errors[Object.keys(err.errors)[0]].properties ? err.errors[Object.keys(err.errors)[0]].properties.message : '';
      const field = err.errors[Object.keys(err.errors)[0]].path;
      const input = err.errors[Object.keys(err.errors)[0]].value;
      errorCode.message = `${errorCode.message.replace(/\b(field)\b/gi, field).replace(/\b(value)\b/gi, input)} ${validationMessage}`;
      break;
    }
    default: {
      errorCode = { ...errorCodes.INTERNAL_SERVER_ERROR };
      errorResult = `${err}`;
    }
  }

  return new ErrorResponse(errorCode, errorResult);
};

module.exports = ErrorResponse;
