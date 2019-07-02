const log = console.log;
const express = require('express');

require('../db/mongoose.js'); //connect to db
const User = require('../models/user');
const Task = require('../models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Am I up?');
});

app.post('/users', (req, res) => {
  const user = new User(req.body);

  user.save().then(() => {
    res.send(user)
  }).catch((error) => {
    res.status(400).send(error);
  });
});


// Listen...
app.listen(port, () => {
  log('Listening on port', port);
});
