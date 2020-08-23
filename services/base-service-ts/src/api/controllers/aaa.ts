import * as wrapAsync from '../../helpers/async/wrap-async';
import ErrorResponse from '../../helpers/error/structure/error-response';
import * as formidable from '../../helpers/upload/formidable';
import * as nodemailer from '../../helpers/email/nodemailer';

export const imageUploadExample = async (req, res) => {
  const uploadResult = await formidable.fileUpload(req);

  res.json({ Status: true, uploadResult });
};

export const emailExample = async (req, res) => {
  await nodemailer.sendEmailTo('email@gmail.com');

  res.json({ Status: true });
};

// Wrapping all functions for error catching
wrapAsync.wrapAsyncFunctions(this);
