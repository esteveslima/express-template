const wrapAsync = require('../../services/async/wrap-async');
const ErrorResponse = require('../../services/error/structure/error-response');
const jwtAuth = require('../../services/auth/jwt');
const userDao = require('../../database/dao/user');

exports.appendUser = async (req, res, next) => {
  // Get user from the request authorization header token/cookie
  let { userId } = req;
  // if (!userId) throw new ErrorResponse(ErrorResponse.errorCodes.UNHAUTORIZED, { userId });

  // Considering user already authenticated by nginx subrequest authentication
  if (!userId) {
    const { authorizationHeader } = req.headers;
    const token = authorizationHeader ? authorizationHeader.split(' ')[1] : req.cookies.token;
    userId = jwtAuth.decodeToken(token).id;
  }

  const userById = await userDao.findUserById(userId);
  if (!userById) throw new ErrorResponse(ErrorResponse.errorCodes.UNHAUTORIZED, { userId });

  req.user = userById;

  next();
};

// Wrapping all functions for error catching
wrapAsync.wrapAsyncFunctions(this);
