const wrapAsync = require('../../services/async/wrap-async');
const ErrorResponse = require('../../services/error/structure/error-response');
const formidable = require('../../services/upload/formidable');
const nodemailer = require('../../services/email/nodemailer');

exports.imageUploadExample = async (req, res) => {
  const uploadResult = await formidable.fileUpload(req);

  res.json({ Status: true, uploadResult });
};

exports.emailExample = async (req, res) => {
  await nodemailer.sendEmailTo('email@gmail.com');

  res.json({ Status: true });
};

// Wrapping all functions for error catching
wrapAsync.wrapAsyncFunctions(this);
