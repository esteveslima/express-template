import * as formidable from 'formidable';
import * as path from 'path';
import * as fs from 'fs';
import ErrorResponse from '../error/structure/error-response';

const createFolder = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
  return folderPath;
};

export const fileUploadPath = path.join(__dirname, '../../../resources/uploads');

export const fileUpload = (payload, fileName = Date.now()) => {
  const formidableOptions = {
    uploadDir: fileUploadPath,
    multiples: false,
    keepExtensions: false,
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
        reject(new ErrorResponse(ErrorResponse.errorCodes.UPLOAD_FAILURE, { fileName }));
      }

      // Renaming accepted files
      filesAccepted.forEach((file) => {
        const clientIp = payload.headers['x-forwarded-for'] || payload.connection.remoteAddress;
        const folder = createFolder(`${form.uploadDir}/${clientIp}`);
        const name = form.multiples ? Date.now() : fileName;
        fs.rename(files[file].path, `${folder}/${name}`, (errr) => reject(errr));
      });

      resolve({ filesAccepted });
    });
  });
};
