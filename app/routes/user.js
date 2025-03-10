const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/authentication');
const router = new express.Router();


router.get('/users', async(req, res) => {

  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send();
  }

});

router.get('/users/me', auth, async(req, res) => {
  res.send(req.user);

});

router.post('/users', async(req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  }

  catch (error) {
    res.status(400).send(error.message);
  }

});

router.post('/users/login', async(req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/users/logout', auth, async(req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.post('/users/logout/all', auth, async(req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send(req.user.tokens);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch('/users/me', auth, async(req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [ 'name', 'email', 'age', 'password' ];
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid user update field(s) presented." });
  }

  try {
    updates.forEach((update) => req.user[ update ] = req.body[ update ]);
    await req.user.save();
    res.send(req.user);
  }

  catch (error) {
    res.status(400).send();
  }
});


router.delete('/users/me', auth,  async(req, res) => {

  try {
    // const user = await User.findByIdAndDelete(req.user._id);
    // if (!user) return res.status(404).send();
    // res.send(user);

    await req.user.remove();
    res.send(req.user);
  }

  catch (error) {
    res.status(500).send();
  }
});

module.exports = router;