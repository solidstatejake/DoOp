const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/authentication');
const router = new express.Router();

router.get('/tasks', auth, async(req, res) => {

  try {
    const tasks = await Task.find({ owner: req.user._id });
    res.send(tasks);
  }

  catch (error) {
    res.status(500).send();
  }

});

router.get('/tasks/:id', auth, async(req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) return res.status(404).send();
    res.send(task);
  }

  catch (error) {
    res.status(500).send();
  }

});

router.post('/tasks', auth, async(req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id
  });
  try {
    await task.save();
    res.send();
  }

  catch (error) {
    res.status(400).send();
  }

});

router.patch('/tasks/:id', auth, async(req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [ 'description', 'completed' ];
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid update field(s) presented." });
  }

  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });

    if (!task) return res.status(404).send();

    updates.forEach((update) => task[ update ] = req.body[ update ]);
    await task.save();

    res.send(task);
  }

  catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/tasks/:id', auth, async(req, res) => {

  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!task) return res.status(404).send();
    res.send(task);
  }

  catch (error) {
    res.status(500).send();
  }
});


module.exports = router;