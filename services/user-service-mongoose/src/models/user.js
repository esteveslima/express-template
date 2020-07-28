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
    minlength: [5, 'Login min length = 5'],
    validate: {
      // Regex to validate login characters
      validator: (input) => /^[a-zA-Z][a-zA-Z\-_.0-9]*$/g.test(input),
      message: () => 'Expected only numbers and letters(also allowed: \'.\', \'_\', \'-\')',
    },
  },
  password: {
    type: String,
    required: [true, 'Password required'],
    select: false,
    trim: true,
    maxlength: [128, 'Password max length = 128'],
    minlength: [8, 'Password min length = 8'],
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
    minlength: [3, 'Email min length = 3'],
    validate: {
      // Regex email format unicode
      validator: (input) => /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(input),
      message: (input) => 'Expected format email@domain.com',
    },
  },
  name: {
    type: String,
    required: [true, 'Name required'],
    trim: true,
    maxlength: [50, 'Name max length = 50'],
    minlength: [2, 'Name min length = 2'],
  },
  lastName: {
    type: String,
    required: [true, 'Last Name required'],
    trim: true,
    maxlength: [150, 'Last Name max length = 150'],
    minlength: [2, 'Last Name min length = 2'],
  },
  phone: {
    type: String,
    required: [true, 'Phone required'],
    trim: true,
    maxlength: [15, 'Phone max length = 15'],
    minlength: [10, 'Phone min length = 10'],
    validate: {
      // Regex phone(BR) format
      validator: (input) => /\(?\d{2}\)?\s?\d{4,5}\-?\d{4}/g.test(input),
      message: (input) => 'Expected format (00) 00000-0000',
    },
    set: (input) => {
      // Modify the input to a proper format
      const rawInput = input.replace(/[^\w]/gi, '');
      const ddd = rawInput.slice(0, 2);
      const firstPart = rawInput.length > 10 ? rawInput.slice(2, 7) : rawInput.slice(2, 6);
      const secondPart = rawInput.length > 10 ? rawInput.slice(7) : rawInput.slice(6);
      return `(${ddd}) ${firstPart}-${secondPart}`;
    },
  },
  birthDate: {
    type: Date,
    required: [true, 'Birth date required'],
    trim: true,
    max: Date.now,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'undefined'],
      message: 'The value must be male, female or undefined',
    },
    required: [true, 'Gender required'],
    trim: true,
  },
  personalId: {
    type: String,
    required: [true, 'Personal Id required'],
    unique: true,
    trim: true,
    maxlength: [14, 'Personal Id max length = 14'],
    minlength: [9, 'Personal Id min length = 9'],
    validate: {
      // Regex 'cpf' format
      validator: (input) => /^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$/.test(input),
      message: (input) => 'Expected format 000.000.000-00',
    },
    set: (input) => {
      // Modify the input to a proper format
      const rawInput = input.replace(/[^\w]/gi, '');
      return `${rawInput.slice(0, 3)}.${rawInput.slice(3, 6)}.${rawInput.slice(6, 9)}-${rawInput.slice(9)}`;
    },
  },
  pictureUrl: {
    type: String,
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
