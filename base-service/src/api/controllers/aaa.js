const asyncHandler = require('../middlewares/async/asyncHandler');
const ErrorResponse = require('../middlewares/error/ErrorResponse');

const formidable = require('../../helpers/upload/formidable.js');

exports.fileUploadExample = asyncHandler(async (req, res, next) => {
  await formidable.fileUpload(req);

  res.json({ Status: true });
});

exports.emailExample = asyncHandler(async (req, res) => {

});
