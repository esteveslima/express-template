const asyncHandler = require('../middlewares/async/asyncHandler');
const ErrorResponse = require('../middlewares/error/ErrorResponse');

const formidable = require('../../helpers/upload/formidable.js');
const nodemailer = require('../../helpers/email/nodemailer');

exports.fileUploadExample = asyncHandler(async (req, res, next) => {
  await formidable.fileUpload(req);

  res.json({ Status: true });
});

exports.emailExample = asyncHandler(async (req, res) => {
  await nodemailer.sendEmailTo('email@gmail.com');

  res.json({ Status: true });
});
