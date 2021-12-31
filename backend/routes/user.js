const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

const userCtrl = require('../controllers/user.js');

router.post('/signup', multer, userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/profile/:id', auth, userCtrl.getOneUser)
router.put('/profile', auth, userCtrl.updateUser)


module.exports = router;