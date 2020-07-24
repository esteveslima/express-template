// Class wraping error responses
const errorCodes = require('./errorCodes');

class ErrorResponse extends Error {
  constructor(error, result) {
    super();
    this.error = error;
    this.result = result;
  }
}
ErrorResponse.errorCodes = errorCodes;

module.exports = ErrorResponse;
