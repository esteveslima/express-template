const wrapAsync = require('../../helpers/async/wrap-async');
const ErrorResponse = require('../../helpers/error/structure/error-response');
const userDao = require('../../database/dao/user');
const formidable = require('../../helpers/upload/formidable');

exports.getUser = async (req, res) => {
  const { userName } = req.params;

  const user = await userDao.getUser(userName);

  if (!user) throw new ErrorResponse(ErrorResponse.errorCodes.NOT_FOUND, userName);

  res.status(200).json({ Status: true, user });
};

exports.createUser = async (req, res) => {
  const userData = req.body;

  const user = await userDao.createUser(userData);

  res.status(200).json({ Status: true, user });
};

exports.updateUser = async (req, res) => {
  const userData = req.body;
  const { userName } = req.params;

  const user = await userDao.updateUser(userName, userData);

  if (!user) throw new ErrorResponse(ErrorResponse.errorCodes.NOT_FOUND, userData);

  res.status(200).json({ Status: true, user });
};

exports.deleteUser = async (req, res) => {
  const { userName } = req.params;

  const user = await userDao.deleteUser(userName);

  if (!user) throw new ErrorResponse(ErrorResponse.errorCodes.NOT_FOUND, userName);

  res.status(200).json({ Status: true });
};

exports.changePassword = async (req, res) => {
  const { userName } = req.user;

  const user = await userDao.getEntireUser(userName);

  if (!user) throw new ErrorResponse(ErrorResponse.errorCodes.NOT_FOUND, { userName });

  const { password, newPassword } = req.body;

  const passwordMatch = await user.checkPassword(password);
  if (!passwordMatch) throw new ErrorResponse(ErrorResponse.errorCodes.WRONG_PARAMETERS, 'Wrong password');

  await userDao.changeUserPassword(userName, newPassword);

  // Expires cookie to logout
  res.cookie('token', undefined, {
    expires: new Date(Date.now()),
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
  });

  res.status(200).json({ Status: true });
};

//

exports.pictureUpload = async (req, res) => {
  const { userName } = req.user;

  await formidable.fileUpload(req, userName);

  res.status(200).json({ Status: true });
};

exports.getPicture = async (req, res) => {
  const { userName } = req.user;

  const file = await formidable.findUploadedPicture(userName);

  res.status(200).download(file);
};

// Wrapping all functions for error catching
wrapAsync.wrapAsyncFunctions(this);
