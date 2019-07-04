const express = require('express');
const userController = require('../controllers/userController');
const auth = require('./middleware/authentication');
const router = new express.Router();

router.get('', userController.getAllUserProfiles);

router.get('/me', auth, userController.getProfile);

router.post('/new', userController.create);

router.post('/login', userController.login);

router.post('/logout', auth, userController.logout);

router.post('/logout/all', auth, userController.logoutAll);

router.patch('/me', auth, userController.update);

router.delete('/me', auth, userController.destroy);

module.exports = router;