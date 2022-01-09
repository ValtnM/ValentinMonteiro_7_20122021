// Création du router
const express = require('express');
const router = express.Router();


// Importation des middleware
const auth = require('../middleware/auth')


// Importation des controllers
const liketCtrl = require('../controllers/like.js');


// Déclaration des routes Like
router.post('/:postId/like', auth, liketCtrl.likePost);
router.get('/:postId/like', auth, liketCtrl.getOnePostLike);



// Exportation du router
module.exports = router;