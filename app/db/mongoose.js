const log = console.log;
const mongoose = require('mongoose');
const validator = require('validator');

const connectionURL = 'mongodb://127.0.0.1:27017/do-op-api';

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true
});

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
});

const Task = mongoose.model('Task', {
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean
  },
});


const katya = new User({
  name: 'Katya',
  email:'KiWasiu1@binghamton.edu',
  age: 21
}).save().then((user)=>{
  log(user);
}).catch((error)=>{
  log(error);
});
