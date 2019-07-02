const log = console.log;
const express = require('express');

require('../db/mongoose.js'); //connect to db
const User = require('../models/user');
const Task = require('../models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

/* Routes */

// GET
app.get('/', (req, res) => {
  res.send('Am I up?');
});

app.get('/users', async(req, res) => {

  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send();
  }

});

app.get('/users/:id', async(req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    if (!user) return res.status(404).send();
    res.send(user);
  }

  catch (error) {
    res.status(500).send();
  }

});

app.get('/tasks', async(req, res) => {

  try {
    const tasks = await Task.find({});
    res.send(tasks);
  }

  catch (error) {
    res.status(500).send();
  }

});

app.get('/tasks/:id', async(req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    if (!task) return res.status(404).send();
    res.send(task);
  }

  catch (error) {
    res.status(500).send();
  }

});

// POST

app.post('/users', async(req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  }

  catch (error) {
    res.status(400).send(error);
  }

});

app.post('/tasks', async(req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.send();
  }

  catch (error) {
    res.status(400).send();
  }

});

// PATCH

app.patch('/users/:id', async(req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [ 'name', 'email', 'age', 'password' ];
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid update field(s) presented." });
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!user) return res.status(404).send();

    res.send(user);
  }

  catch (error) {
    res.status(400).send();
  }
});

app.patch('/tasks/:id', async(req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [ 'description', 'completed' ];
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid update field(s) presented." });
  }

  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true });

    if(!task) return res.status(404).send();

    res.send(task);
  }

  catch (error) {
    res.status(400).send(error);
  }
});

// Listen...
app.listen(port, () => {
  log('Listening on port', port);
});
