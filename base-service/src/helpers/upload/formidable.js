const formidable = require('formidable');
const path = require('path');

const fileUploadPath = path.join(__dirname, '../../resources/uploads');

exports.fileUpload = (req) => {
  const formidableOptions = {
    uploadDir: fileUploadPath,
    multiples: false,
    keepExtensions: false,
    maxFileSize: 10 * 1024 * 1024, // 10MB
  };
  const form = formidable(formidableOptions);

  // wrapping callback in a promise for proper response
  return new Promise((resolve, reject) => {
    form.parse(req, (err/* , fields, files */) => {
      if (err) {
        reject(err);
      }
      resolve(true);
    });
  });
};
