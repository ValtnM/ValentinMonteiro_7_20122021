const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post.js');


router.post('/new', postCtrl.createPost);
router.get('/', postCtrl.getAllPost);

module.exports = router;