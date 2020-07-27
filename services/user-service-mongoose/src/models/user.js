const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  login: {
    type: String,
    required: [true, 'Login required'],
    select: false,
    unique: true,
    trim: true,
    maxlength: [30, 'Login max length = 30'],
    minLength: [5, 'Login min length = 5'],
  },
  password: {
    type: String,
    required: [true, 'Password required'],
    select: false,
    trim: true,
    maxlength: [128, 'Password max length = 128'],
    minLength: [8, 'Password min length = 8'],
    validate: {
      // Regex to validate password strength
      validator: (input) => /(?=^.{8,128}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(input),
      message: () => 'Weak Password. Must have a length between 8~128 and a minimum of 1 uppercase, lowercase, symbol and number',
    },
  },
  email: {
    type: String,
    required: [true, 'Email required'],
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: [320, 'Email max length = 320'],
    minLength: [3, 'Email min length = 3'],
    validate: {
      // Regex email format unicode
      validator: (input) => /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(input),
      message: (input) => `${input.value} is not a valid email`,
    },
  },
  name: {
    type: String,
    required: [true, 'Name required'],
    trim: true,
    maxlength: [50, 'Name max length = 50'],
    minLength: [2, 'Name min length = 2'],
  },
  lastName: {
    type: String,
    required: [true, 'Last Name required'],
    trim: true,
    maxlength: [150, 'Last Name max length = 150'],
    minLength: [2, 'Last Name min length = 2'],
  },
  bithDate: {
    type: Date,
    required: true,
    trim: true,
    max: Date.now,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'undefined'],
    required: true,
    trim: true,
  },
  personalId: {
    type: String,
    required: [true, 'Personal Id required'],
    unique: true,
    trim: true,
    validate: {
      // Regex 'cpf' format
      validator: (input) => /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(input),
      message: (input) => `${input.value} is not a valid personal id`,
    },
  },
  pictureUrl: {
    type: String,
    required: false,
    trim: true,
  },
});

// Encrypting password before storing
UserSchema.pre('save', async function encryptPassword() {
  const saltRounds = 10;
  const hash = await bcrypt.hash(this.password, saltRounds);
  this.password = hash;
});

module.exports = mongoose.model('User', UserSchema);
