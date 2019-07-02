const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 15,
    validate(name) {
      const regex = /f+u+c+k+/;
      if(validator.matches(name, regex)) throw new Error("Name cannot contain" +
        " profanity.");
    }

  },

  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(emailAddress){
      if(!validator.isEmail(emailAddress)){
        throw new Error('Please enter a valid email address.');
      }
    }
  },

  age: {
    type: Number,
    required: true,
    min: 13,
    max: 110
  },

  password: {
    type: String,
    required: true,
    min: 8,
    max: 40,
    validate(password) {
      const regex = /^password\d*/i;
      if(password.match(regex)){
        throw new Error("Password cannot be a variation of 'password'.")
      }
    }
  }
});

module.exports = User;