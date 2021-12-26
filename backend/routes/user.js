const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user.js');

router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/profile', userCtrl.getOneUser)
router.put('/profile', userCtrl.updateUser)


module.exports = router;