const wrapAsync = require('../../helpers/async/wrap-async');
const ErrorResponse = require('../../helpers/error/structure/error-response');
const formidable = require('../../helpers/upload/formidable.js');
const nodemailer = require('../../helpers/email/nodemailer');

exports.fileUploadExample = async (req, res) => {
  await formidable.fileUpload(req);

  res.json({ Status: true });
};

exports.emailExample = async (req, res) => {
  await nodemailer.sendEmailTo('email@gmail.com');

  res.json({ Status: true });
};

// Wrapping all functions for error catching
wrapAsync.wrapAsyncFunctions(this);
