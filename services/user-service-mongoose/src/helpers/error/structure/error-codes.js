// List of every error for proper responses
module.exports = {
  INTERNAL_SERVER_ERROR: { errorCode: 1000, httpCode: 500, message: 'Internal server error, please try again later or contact the support' },
  NOT_FOUND: { errorCode: 1001, httpCode: 404, message: 'Resource not found' },
  WRONG_PARAMETERS: { errorCode: 1002, httpCode: 400, message: 'Wrong parameters, please check the request' },
  TOO_MANY_REQUESTS: { errorCode: 1003, httpCode: 429, message: 'Too many requests, please try again later' },
  TOO_MANY_UPLOADS: { errorCode: 1004, httpCode: 429, message: 'Too many uploads, please try again later' },
  EXCESSIVE_PAYLOAD: { errorCode: 1005, httpCode: 413, message: 'Excessive request payload, please check the request' },
  UPLOAD_FAILURE: { errorCode: 1006, httpCode: 409, message: 'Failed to upload files, please check the request files' },
  LOGIN_FAILURE: { errorCode: 1007, httpCode: 401, message: 'Failed to login, please try again' },
  UNHAUTORIZED: { errorCode: 1008, httpCode: 401, message: 'Unhautorized, please authenticate' },

  // Mongo errors

  // generic response which may have strategic words(field and value) replaced for dynamic responses
  DUPLICATED_KEY: { errorCode: 2001, httpCode: 400, message: 'This field already exists, please provide another valid field.' },
  INVALID_FIELD: { errorCode: 2002, httpCode: 400, message: 'Invalid field \'value\', please check the request and field.' },

};
