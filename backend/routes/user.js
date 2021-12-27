const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')

const userCtrl = require('../controllers/user.js');

router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/profile', auth, userCtrl.getOneUser)
router.put('/profile', auth, userCtrl.updateUser)


module.exports = router;