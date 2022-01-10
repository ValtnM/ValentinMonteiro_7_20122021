// Création du router
const express = require('express');
const router = express.Router();


// Importation des middleware
const auth = require('../middleware/auth');


// Importation des controllers
const commentCtrl = require('../controllers/comment.js');


// Déclaration des routes Like
router.get('/:postId/comment', auth, commentCtrl.getAllComments);
router.post('/:postId/comment', auth, commentCtrl.createComment);
router.delete('/comment/:commentId', auth, commentCtrl.deleteComment);



// Exportation du router
module.exports = router;