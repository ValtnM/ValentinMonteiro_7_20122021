// Création du router
const express = require('express');
const router = express.Router();


// Importation des middleware
const auth = require('../middleware/auth')


// Importation des controllers
const likeCtrl = require('../controllers/like.js');


// Déclaration des routes Like
router.post('/:postId/like', auth, likeCtrl.likePost);
router.get('/:postId/like', auth, likeCtrl.getOnePostLike);



// Exportation du router
module.exports = router;