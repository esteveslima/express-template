const express = require('express');
const user = require('../controllers/user');
const validateMiddleware = require('../middlewares/validate-request');
const rateLimiter = require('../../services/security/rate-limit');

exports.joinToRouter = (mainRouter) => {
  const userRouter = express.Router();
  mainRouter.use('/user', userRouter);

  userRouter.get('/get/:userName', user.getUser);
  userRouter.post('/public/create', user.createUser);
  userRouter.put('/update/:userName', validateMiddleware.validateUsername, user.updateUser);
  userRouter.delete('/delete/:userName', validateMiddleware.validateUsername, user.deleteUser);

  // These (private)routes use the user collected from authMiddleware defined in router
  userRouter.post('/pictureUpload', rateLimiter.setupFileUploadRateLimit(), user.pictureUpload);
  userRouter.get('/getPicture', rateLimiter.setupFileUploadRateLimit(), user.getPicture);
  userRouter.post('/changePassword', rateLimiter.setupRestorePasswordRateLimit(), user.changePassword);
};
