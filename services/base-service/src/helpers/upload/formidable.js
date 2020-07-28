const formidable = require('formidable');
const path = require('path');
const ErrorResponse = require('../error/structure/error-response');

const fileUploadPath = path.join(__dirname, '../../resources/uploads');

exports.fileUpload = (req) => {
  const formidableOptions = {
    uploadDir: fileUploadPath,
    multiples: false,
    keepExtensions: false,
    maxFileSize: 10 * 1024 * 1024, // 10MB
  };
  const form = formidable(formidableOptions);

  // Validate allowed file types and names and separate rejected ones for response
  const mimeTypesWhiteList = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
  const regexBlackList = /[.:;#$&%@!{}'"\\\/*`><|\?]/g;
  const filesAccepted = [];
  const filesRejected = [];
  form.onPart = (part) => {
    const fileName = part.filename.slice(0, part.filename.lastIndexOf('.'));
    const isFileNameInvalid = fileName.match(regexBlackList);
    if (mimeTypesWhiteList.includes(part.mime) && !isFileNameInvalid) {
      filesAccepted.push(part.filename);
      form.handlePart(part);
    } else {
      filesRejected.push(part.filename);
    }
  };

  // wrapping callback in a promise for proper response
  return new Promise((resolve, reject) => {
    form.parse(req, (err/* , fields, files */) => {
      if (err) reject(err);
      if (filesAccepted.length === 0) {
        reject(new ErrorResponse(ErrorResponse.errorCodes.UPLOAD_FAILURE, { filesRejected }));
      }
      resolve({ filesAccepted, filesRejected });
    });
  });
};
