const jwt = require('jsonwebtoken');
const ErrorResponse = require('../error/structure/error-response');

// Upon login authentication success, generate an access token valid for one hour
exports.authenticate = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    // jwt expiresIn is the aditional time in seconds to expire the token
    expiresIn: 60 * process.env.JWT_EXPIRATION, // 60 minutes
  });
  return token;
};

// Verifies jwt embbeded on header or cookie for user authorization
exports.authorization = (req, res, next) => {
  // Pattern as "Bearer JSON_WEB_TOKEN" in the headers or {"token": JSON_WEB_TOKEN} in the cookie
  const { authorization } = req.headers;
  const token = authorization ? authorization.split(' ')[1] : req.cookies.token;

  try {
    /* const decodedToken = */ jwt.verify(token, process.env.JWT_SECRET);
    // req.userId = decodedToken.id;
    next();
  } catch (e) {
    return next(new ErrorResponse(ErrorResponse.errorCodes.UNHAUTORIZED, { token }));
  }
};

//

// Generates arbitrary jwt
// Used to create 'restore password' tokens
exports.generateToken = ({ payload, secret = process.env.JWT_SECRET }) => {
  const expires = 60 * 60; // 60 min
  const token = jwt.sign({ payload }, secret, {
    expiresIn: expires,
  });

  return token;
};
// Verifies arbitrary jwt
// Used to verify 'restore password' token
exports.verifyToken = ({ token, secret = process.env.JWT_SECRET }) => {
  try {
    const verifiedToken = jwt.verify(token, secret);
    return verifiedToken;
  } catch (e) {
    return new ErrorResponse(ErrorResponse.errorCodes.NOT_FOUND, token);
  }
};
// Decode arbitrary jwt, without verifying
// Used to get user email in 'restore password' token payload
exports.decodeToken = (token) => {
  try {
    const decodedToken = jwt.decode(token);
    return decodedToken;
  } catch (e) {
    return new ErrorResponse(ErrorResponse.errorCodes.NOT_FOUND, token);
  }
};
