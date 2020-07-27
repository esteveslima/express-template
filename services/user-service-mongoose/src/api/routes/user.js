const express = require('express');
const user = require('../controllers/user');

const rateLimiter = require('../../helpers/security/rate-limit');

exports.joinToRouter = (mainRouter) => {
  const userRouter = express.Router();
  mainRouter.use('/user', userRouter);

  userRouter.get('/get/:id', user.getUser);
  userRouter.post('/create', user.createUser);
  userRouter.put('/update/:id', user.updateUser);
  userRouter.delete('/delete/:id', user.deleteUser);

  userRouter.post('/pictureUpload', rateLimiter.setupFileUploadRateLimit(), user.pictureUpload);
  userRouter.post('/restorePassword', rateLimiter.setupRestorePasswordRateLimit(), user.restorePassword);
};
