const wrapAsync = require('../../helpers/async/wrap-async');
const ErrorResponse = require('../../helpers/error/structure/error-response');
const userDao = require('../../database/dao/user');
const jwtAuth = require('../../helpers/auth/jwt');
const nodemailer = require('../../helpers/email/nodemailer');

exports.login = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    throw new ErrorResponse(ErrorResponse.errorCodes.WRONG_PARAMETERS, { userName });
  }

  const user = await userDao.getEntireUser(userName);

  if (!user) throw new ErrorResponse(ErrorResponse.errorCodes.LOGIN_FAILURE, { userName });

  const passwordMatch = await user.checkPassword(password);
  if (!passwordMatch) throw new ErrorResponse(ErrorResponse.errorCodes.LOGIN_FAILURE, { userName });

  const token = jwtAuth.authenticate(user._id);

  res.cookie('token', token, {
    expires: new Date(Date.now() + process.env.JWT_EXPIRATION * 1000), // 60 minutes
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
  });

  res.status(200).json({ Status: true, token });
};

exports.logout = (req, res) => {
  // Only clear the cookies for logout, jwt still would work ultil expiration
  res.cookie('token', undefined, {
    expires: new Date(Date.now()),
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
  });
  res.status(200).json({ Status: true });
};

//

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) throw new ErrorResponse(ErrorResponse.errorCodes.WRONG_PARAMETERS, { email });

  const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // 1 hour valid jwt, identified by user email(unique)...
  // ...that can only be verified with requests from the same device(ip address)
  const token = jwtAuth.generateToken({ payload: email, secret: `${ipAddress} ${email}` });

  const mailData = {
    mailSubject: 'Restore Password',
    mailBody: token,
  };
  await nodemailer.sendEmailTo(email, mailData);

  res.status(200).json({ Status: true });
};

exports.restorePassword = async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) {
    throw new ErrorResponse(ErrorResponse.errorCodes.WRONG_PARAMETERS, { token, newPassword });
  }

  const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  const decodedToken = jwtAuth.decodeToken(token);
  const userEmail = decodedToken.payload;

  // Verify if the token is being used with the same email and device(ip address) within expiration
  const verifiedToken = jwtAuth.verifyToken({ token, secret: `${ipAddress} ${userEmail}` });
  if (verifiedToken instanceof ErrorResponse) throw verifiedToken;

  const user = await userDao.findUserByEmail(userEmail);
  if (!user) throw new ErrorResponse(ErrorResponse.errorCodes.NOT_FOUND, { userEmail });

  const { userName } = user;
  await userDao.changeUserPassword(userName, newPassword);

  res.status(200).json({ Status: true });
};

// Wrapping all functions for error catching
wrapAsync.wrapAsyncFunctions(this);
