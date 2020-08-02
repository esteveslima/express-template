const wrapAsync = require('../../helpers/async/wrap-async');
const userDao = require('../../database/dao/user');
const ErrorResponse = require('../../helpers/error/structure/error-response');

exports.validateUsername = async (req, res, next) => {
  const { userName } = req.params;

  const user = await userDao.getUser(userName);

  if (!user) throw new ErrorResponse(ErrorResponse.errorCodes.NOT_FOUND, user);

  next();
};

exports.validateEmail = async (req, res, next) => {
  const { email } = req.body;

  const user = await userDao.findUserByEmail(email);

  if (!user) throw new ErrorResponse(ErrorResponse.errorCodes.NOT_FOUND, user);

  next();
};

// Wrapping all functions for error catching
wrapAsync.wrapAsyncFunctions(this);
