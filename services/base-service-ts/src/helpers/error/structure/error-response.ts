// Class wraping error responses
import { errorCodes } from './error-codes';

export default class ErrorResponse extends Error {
  error: typeof errorCodes;

  result: any;

  static errorCodes: typeof errorCodes = errorCodes;

  constructor(error, result) {
    super();
    this.error = error;
    this.result = result;
  }

  static parse = (err: ErrorConstructor | ErrorResponse) : ErrorResponse => {
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
}
