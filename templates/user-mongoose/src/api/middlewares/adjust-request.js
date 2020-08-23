const wrapAsync = require('../../services/async/wrap-async');
const ErrorResponse = require('../../services/error/structure/error-response');
const userDao = require('../../database/dao/user');

exports.appendUser = async (req, res, next) => {
  // Get user from the request authorization header token/cookie
  const { userId } = req;
  if (!userId) throw new ErrorResponse(ErrorResponse.errorCodes.UNHAUTORIZED, { userId });

  const userById = await userDao.findUserById(userId);
  if (!userById) throw new ErrorResponse(ErrorResponse.errorCodes.UNHAUTORIZED, { userId });

  req.user = userById;

  next();
};

// Wrapping all functions for error catching
wrapAsync.wrapAsyncFunctions(this);
