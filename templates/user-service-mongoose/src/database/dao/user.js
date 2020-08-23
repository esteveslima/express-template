const wrapLogger = require('../../services/log/wrap-logger');
const UserModel = require('../../models/user');

exports.getUser = async (userName) => {
  // removing unecessary data from response
  const project = { _id: 0, __v: 0 };

  const user = await UserModel.findOne({ userName }, project);

  return user;
};

exports.getEntireUser = async (userName) => {
  // Enabling return unselected password from schema
  const user = await UserModel.findOne({ userName }).select('+password +userName');
  return user;
};

exports.findUserById = async (userId) => {
  const project = { __v: 0 };

  // Enabling return unselected userName from schema
  const user = await UserModel.findOne({ _id: userId }, project).select('+userName');

  return user;
};

exports.findUserByEmail = async (email) => {
  const project = { _id: 0, __v: 0 };

  const user = await UserModel.findOne({ email }, project).select('+userName');

  return user;
};

exports.createUser = async (userData) => {
  const user = await UserModel.create(userData);
  return user;
};

exports.updateUser = async (userName, userData) => {
  const updateData = { ...userData };
  delete updateData.userName;
  delete updateData.password;

  const user = await UserModel.findOneAndUpdate(
    { userName },
    userData,
    {
      new: true,
      runValidators: true,
    },
  );

  return user;
};

exports.changeUserPassword = async (userName, newPassword) => {
  const user = await this.getEntireUser(userName);
  user.password = newPassword;
  await user.save();

  return user;
};

exports.deleteUser = async (userName) => {
  const user = await UserModel.findOneAndDelete({ userName });
  return user;
};

// Wrap all functions for log tracing
wrapLogger.wrapDaoLogger(this);
