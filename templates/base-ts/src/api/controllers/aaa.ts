import type { RequestHandler } from 'express'; // eslint-disable-line no-unused-vars
import * as wrapAsync from '../../services/async/wrap-async';
import ErrorResponse from '../../services/error/structure/error-response';
import * as formidable from '../../services/upload/formidable';
import * as nodemailer from '../../services/email/nodemailer';

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
