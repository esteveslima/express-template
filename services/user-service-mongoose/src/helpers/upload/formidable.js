const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const ErrorResponse = require('../error/structure/error-response');

const createFolder = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
  return folderPath;
};

const fileUploadPath = path.join(__dirname, '../../resources/uploads');

exports.fileUpload = (payload, userName) => {
  const formidableOptions = {
    uploadDir: fileUploadPath,
    multiples: false,
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB
  };
  const form = formidable(formidableOptions);

  // Validate allowed file types and names and separate rejected ones for response
  const mimeTypesWhiteList = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
  const charactersBlackList = /[.:;#$&%@!{}'"\\\/*`><|\?]/g;
  form.onPart = (part) => {
    const uploadedFileName = part.filename.slice(0, part.filename.lastIndexOf('.'));
    const isFileNameValid = !uploadedFileName.match(charactersBlackList);
    if (mimeTypesWhiteList.includes(part.mime) && isFileNameValid) {
      form.handlePart(part);
    }
  };

  // wrapping callback in a promise for proper response
  return new Promise((resolve, reject) => {
    form.parse(payload, (err, fields, files) => {
      if (err) reject(err);
      const filesAccepted = Object.keys(files);
      if (!filesAccepted.length) {
        reject(new ErrorResponse(ErrorResponse.errorCodes.UPLOAD_FAILURE, { userName }));
      }

      // Renaming accepted files
      filesAccepted.forEach((file) => {
        const folder = createFolder(`${form.uploadDir}/${userName}`);
        const name = 'profile_picture';
        const extension = files[file].name.slice(files[file].name.lastIndexOf('.') + 1);
        fs.rename(files[file].path, `${folder}/${name}.${extension}`, (errr) => reject(errr));
      });

      resolve({ filesAccepted });
    });
  });
};

exports.findUploadedPicture = (userName) => {
  const userFolder = `${fileUploadPath}/${userName}`;
  if (!fs.existsSync(userFolder)) {
    throw new ErrorResponse(ErrorResponse.errorCodes.NOT_FOUND, { userName });
  }
  // wrapping callback
  return new Promise((resolve, reject) => {
    // List files in the directory to check the picture file
    fs.readdir(userFolder, (err, files) => {
      if (err) reject(err);
      const file = files.find((fileName) => fileName.slice(0, fileName.lastIndexOf('.')) === 'profile_picture');
      if (!file) reject(new ErrorResponse(ErrorResponse.errorCodes.NOT_FOUND, { userName }));
      const filePath = `${userFolder}/${file}`;
      resolve(filePath);
    });
  });
};
