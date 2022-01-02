// Création du router
const express = require('express');
const router = express.Router();


// Importation des middleware
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')


// Importation des controllers
const userCtrl = require('../controllers/user.js');


// Déclaration des routes User
router.post('/signup', multer, userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/profile/:id', auth, userCtrl.getOneUser)
router.put('/profile', auth, userCtrl.updateUser)


// Exportation du router
module.exports = router;