const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

const postCtrl = require('../controllers/post.js');


router.post('/new', auth, multer, postCtrl.createPost);
router.get('/', auth, postCtrl.getAllPost);

module.exports = router;