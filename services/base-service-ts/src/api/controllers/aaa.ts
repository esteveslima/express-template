import type { RequestHandler } from 'express'; // eslint-disable-line no-unused-vars
import * as wrapAsync from '../../helpers/async/wrap-async';
import ErrorResponse from '../../helpers/error/structure/error-response';
import * as formidable from '../../helpers/upload/formidable';
import * as nodemailer from '../../helpers/email/nodemailer';

export const imageUploadExample : RequestHandler = async (req, res) : Promise<void> => {
  const uploadResult = await formidable.fileUpload(req);

  res.json({ Status: true, uploadResult });
};

export const emailExample : RequestHandler = async (req, res) : Promise<void> => {
  await nodemailer.sendEmailTo('email@gmail.com');

  res.json({ Status: true });
};

// Wrapping all functions for error catching
wrapAsync.wrapAsyncFunctions(this);
