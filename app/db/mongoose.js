const log = console.log;
const mongoose = require('mongoose');

const connectionURL = 'mongodb://127.0.0.1:27017/do-op-api';

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true
});

const User = mongoose.model('User', {
  name: {
    type: String,

  },
  age: {
    type: Number,
  },
});

const Task = mongoose.model('Task', {
  description: {
    type: String
  },
  completed: {
    type: Boolean
  },
});

const task = new Task({
  description: 'Walk the doggies!',
  completed: false
}).save().then((task) => {
  log(task)
}).catch((error) => {
  log(error)
});
