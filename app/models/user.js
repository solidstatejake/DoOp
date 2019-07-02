const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 15,
    validate(name) {
      const regex = /f+u+c+k+/;
      if (validator.matches(name, regex)) throw new Error("Name cannot contain" +
        " profanity.");
    }

  },

  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(emailAddress) {
      if (!validator.isEmail(emailAddress)) {
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
      if (password.match(regex)) {
        throw new Error("Password cannot be a variation of 'password'.")
      }
    }
  },

  tokens: [ {
    token: {
      type: String,
      required: true
    }
  } ]
});

userSchema.methods.generateAuthToken = async function() {
  const user = this;
  // create a json web token
  const token = jsonWebToken.sign({ _id: user._id.toString() }, "somerandomjsontokenforsigning");
  //add it to the user document in mongo
  user.tokens = user.tokens.concat({ token });
  //save that addition to db
  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async(email, password) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("No user exists with provided email or password");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error('No user exists with provided email or password');

  return user;
};


userSchema.pre('save', async function(next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;