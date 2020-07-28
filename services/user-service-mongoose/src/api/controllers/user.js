const wrapAsync = require('../../helpers/async/wrap-async');
const ErrorResponse = require('../../helpers/error/structure/error-response');
const UserModel = require('../../models/user');
const formidable = require('../../helpers/upload/formidable.js');
const nodemailer = require('../../helpers/email/nodemailer');

exports.getUser = async (req, res) => {
  const userId = req.params.id;

  const user = await UserModel.findById(userId);

  if (!user) throw new ErrorResponse(ErrorResponse.errorCodes.NOT_FOUND, user);

  res.status(200).json({ user });
};

exports.createUser = async (req, res) => {
  const userData = req.body;

  const user = await UserModel.create(userData);

  res.status(200).json({ Status: true });
};

exports.updateUser = async (req, res) => {

};

exports.deleteUser = async (req, res) => {

};

exports.pictureUpload = async (req, res) => {
  await formidable.fileUpload(req);

  res.json({ Status: true });
};

exports.restorePassword = async (req, res) => {
  await nodemailer.sendEmailTo('email@gmail.com');

  res.json({ Status: true });
};

// Wrapping all functions for error catching
wrapAsync.wrapAsyncFunctions(this);
