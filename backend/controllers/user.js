// Importation des modules
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const fs = require('fs')


// Importation des modèles
const models = require('../models')


// Création des Regex
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*\d).{8,15}$/;


// -----> Controllers <-----
// Création d'un nouvel utilisateur
exports.signup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const photo = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

    if(email == null || password == null || firstname == null || lastname == null) {
        return res.status(400).json({ message: 'paramètres manquants' });
    } 
    if (firstname.length > 20 || firstname.length < 2) {
        return res.status(400).json({ 'message': 'prénom invalide (doit être entre 2 et 20 caractères)' })
    } 
    if (lastname.length > 20 || lastname.length < 2) {
        return res.status(400).json({ 'erreur': 'nom invalide (doit être entre 2 et 20 caractères)' })
    } 
    if(!emailRegex.test(email)) {
        return res.status(400).json({ 'erreur': 'email invalide' })
    } 
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ 'erreur': 'mot de passe invalide (doit contenir entre 8 et 15 caractères et au moins un chiffre)'})
    }

    models.User.findOne({
        attributes: ['email'],
        where: { email: email }
    })
    .then(user => {
        if(!user) {

            bcrypt.hash(password, 10)
                .then(hash => {
                    models.User.create({
                        email: email,
                        password: hash,
                        firstname: firstname,
                        lastname: lastname,
                        photo: photo,
                        isAdmin: 0
                    })
                    .then((newUser) => {
                        return res.status(201).json({ 'userId': newUser.id })
                    })
                    .catch(() => {
                        return res.status(500).json({ erreur: "Impossible de créer un nouvel utilisateur" })
                    })
                }).catch(err => {
                    return res.status(500).json({ err })
                })

        } else {
            return res.status(409).json({ erreur: "L'utilisateur existe déjà !" });
        }
    })
    .catch(err => {
        return res.status(500).json({ erreur: "Utilisateur introuvable !" });
    })
};


// Connexion d'un utilisateur
exports.login = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body);

    if(email == null || password == null) {
        return res.status(400).json({ error: 'Paramètre manquant !' });
    }

    models.User.findOne({
        where: { email: email }
        })
        .then(user => {
            if(!user) {
                return res.status(401).json({ message: 'Utilisateur non trouvé !'})
            }
            console.log(user.email);
            console.log(user.password);
            bcrypt.compare(password, user.password)
                .then(valid => {
                    if(!valid) {
                        return res.status(401).json({ message: 'Mot de passe incorrect !'} )
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwtUtils.generateTokenForUser(user)
                    })
                })
                .catch(err => {
                    res.status(500).json({ err })
                });
        })
        .catch(err => {
            res.status(500).json({ err })

        });
}


// Récupération des données d'un utilisateur
exports.getOneUser = (req, res, next) => {
    const userId = req.params.id;
    models.User.findOne({
        attributes: [ 'id', 'email', 'firstname', 'lastname', 'photo', 'isAdmin' ],
        where: { id: userId }
    }).then((user) => {
        if(user){
            res.status(200).json(user);
        } else {
            res.status(404).json({ 'erreur': 'Utilisateur non trouvé !'})
        }
    }).catch(err => res.status(500).json({err}))
}


// Mise à jour des données d'un utilisateur
exports.updateUser = (req, res, next) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);

    const email = req.body.email
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const photo = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;
   
    // Recherche des informations de l'utilisateur dans la BDD
    models.User.findOne({
        attributes: ['id', 'email', 'firstname', 'lastname', 'photo'],
        where: { id: userId }
    })
        .then(user => {
            if(user) {

                // Suppression de l'ancienne photo
                if(photo != null) {
                    const photoName = user.photo.split('/images/')[1];
                    fs.unlink(`images/${photoName}`, (error) => {
                        if(error){
                            console.log("Echec de suppression de l'image : " + error);
                        } else {
                            console.log("Image supprimée avec succès !");
                        };
                    });
                };

                // Mise à jour du profil avec les nouvelles informations
                user.update({
                    email: (email ? email : user.email),
                    firstname: (firstname ? firstname : user.firstname),
                    lastname: (lastname ? lastname : user.lastname),
                    photo: (photo ? photo : user.photo)
                })
                .then(userUpdated => {
                    if(userUpdated){
                        return res.status(201).json(userUpdated)
                    } else {
                        res.status(500).json({ 'erreur': 'Impossible de mettre a jour le profil de l\'utilisateur' })
                    }
                })
                .catch(() => {
                    res.status(500).json({ 'erreur': 'impossible de mettre à jour l\'utilisateur' })
                });
            } else {
                res.status(404).json({ 'erreur': 'Utilisateur introuvable !' })
            }
        })
        .catch(() => {
            res.status(500).json({ 'erreur': 'impossible de vérifier l\'utilisateur' })
        })
    
}

exports.deleteUser = (req, res, next) => {

    // Récupération de l'ID de l'utilisateur dans le token
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);

    models.User.findOne({ where: { id: userId } })
        .then(user => {

            // Suppression de la photo de l'utilisateur
            let userPhotoName = user.photo.split('/images/')[1];
            fs.unlink(`images/${userPhotoName}`, (error) => {
                if(error){
                    console.log("Echec de suppression de l'image : " + error);
                } else {
                    console.log("Image supprimée avec succès !");
                };
            });

            models.Post.findAll({
                attributes: ['imageContent'],
                where: { userId: user.id }
            })
                .then((posts) => {

                    // Suppression des images des posts de l'utilisateur
                    for(i = 0; i < posts.length; i++){
                        if(posts[i].dataValues.imageContent){
                            console.log(posts[i].dataValues.imageContent.split('images/')[1]);
                            fs.unlink(`images/${posts[i].dataValues.imageContent.split('images/')[1]}`, (error) => {
                                if(error){
                                    console.log("Echec de suppression de l'image : " + error);
                                } else {
                                    console.log("Image supprimée avec succès !");
                                };
                            })
                        }
                    }
                    
                    // Suppression des posts de l'utilisateur
                    models.Post.destroy({ where: {userId: userId} })
                        .then(() => {

                            // Suppression de l'utilisateur de la BDD
                            models.User.destroy({ where: { id: userId } })
                                .then(() => res.status(200).json({ message: 'Utilisateur supprimé avec succès' }))
                                .catch(() => res.status(500).json({ message: "L'utilisateur n'a pas pu être supprimé !" }))
                        })
                        .catch(() => res.status(500).json({ error: "Les publications n'ont pas pu être supprimées ! " }))
                })
                .catch(() => res.status(500).json({ message: "Les posts n'ont pas pu être supprimés !"}))

        })
}