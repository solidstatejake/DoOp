const express = require('express');
const taskController = require('../controllers/taskController');
const auth = require('./middleware/authentication');
const router = new express.Router();

//set sort{ completed: false } to sort by non-completed tasks first
//
router.get('', auth, taskController.getAll);

router.get('/:id', auth, taskController.getById);

router.post('', auth, taskController.create);

router.patch('/:id', auth, taskController.update);

router.delete('/:id', auth, taskController.destroy);


module.exports = router;