// Importation des modules
const jwtUtils = require('../utils/jwt.utils.js');
const fs = require('fs')


// Importation des modèles
const models = require('../models');


// ----->Controllers<-----
// Création d'un nouveau post
exports.createPost = (req, res, next) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);
    const textContent = req.body.textContent;    
    let imageContent = req.file

    if(!textContent && !imageContent) {
        res.status(400).json({ 'erreur': 'paramètre manquant' });
    };

    if(textContent){
        if(textContent.length > 150) {
            res.status(400).json({ 'erreur': 'Texte trop long (150 caractères maximum)' })
        };
    } else {
        imageContent = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        if(imageContent.length > 150) {
            res.status(400).json({ 'erreur': 'Nom de l\'image invalide' })
        };
    }

    models.User.findOne({
        where: { id: userId }
    })
    .then(user => {
        if(user) {
            models.Post.create({
                textContent: textContent,
                imageContent: imageContent,
                like: 0,
                dislike: 0,
                UserId: user.id
            })
            res.status(201).json({"message": "Nouveau post créé avec succès !"})
                    
        } else {
            res.status(404).json({'erreur' : 'Utilisateur introuvable'});
        };
    })
    .catch(err => {
        res.status(500).json({ 'err': 'ERREUR !!!' });
    });
};


// Récuperation de tous les posts
exports.getAllPost = (req, res, next) => {
    const fields = req.query.fields;
    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.offset);
    const order = req.query.order;

    models.Post.findAll({
        order: [(order != null) ? order.split(':') : ['id', 'DESC']],
        attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
        limit: (!isNaN(limit)) ? limit : null,
        offset: (!isNaN(offset)) ? offset : null,
        include: [{
            model: models.User,
            attributes: ['id','firstname', 'lastname', 'photo']
        }]

        
    }).then(posts => {
        if(posts){
            res.status(200).json(posts);
        } else {
            res.status(404).json({ "erreur": "Aucun message trouvé"});
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ "erreur": "Champs invalides"});
    });
};


// Récupération des posts d'un utilisateur
exports.getUserPost = (req, res, next) => {
    const userId = req.params.id;
    
    const fields = req.query.fields;
    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.offset);
    const order = req.query.order;

    models.Post.findAll({
        where: {userId: userId},
        order: [(order != null) ? order.split(':') : ['id', 'DESC']],
        attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
        limit: (!isNaN(limit)) ? limit : null,
        offset: (!isNaN(offset)) ? offset : null,
        include: [{
            model: models.User,
            attributes: ['id','firstname', 'lastname', 'photo']
        }]
    }).then(posts => {
        if(posts){
            res.status(200).json(posts);
        } else {
            res.status(404).json({ "erreur": "Aucun message trouvé"});
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ "erreur": "Champs invalides"});
    });
};

// exports.addLike = (req, res, next) => {
//     const headerAuth = req.headers['authorization'];
//     const userId = jwtUtils.getUserId(headerAuth);
//     const postId = req.params.id;
//     console.log('body: ' + req.body.like);

//     models.Post.findOne({ where: { id: postId } })
//         .then(post => {
//             console.log(post.dataValues);
//             post.update({
//                 like: req.body.like
//             })
//                 .then(() => res.status(200).json({ message: 'Données mises à jour !' }))
//                 .catch((err) => res.status(500).json({ err }))
//         })
//         .catch(() => res.status(404).json({ error: 'Post introuvable !' }));
// };


// Mise à jour d'un post
exports.updatePost = (req, res, next) => {
    const postId = req.params.id;
    const textContent = req.body.textContent;
    // console.log('body: ' + req.body);
    let imageContent = req.file

    if(!textContent && !imageContent) {
        res.status(400).json({ 'erreur': 'paramètre manquant' });
    };

    if(textContent){
        if(textContent.length > 150) {
            res.status(400).json({ 'erreur': 'Texte trop long (150 caractères maximum)' })
        };
    } else {
        imageContent = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        if(imageContent.length > 150) {
            res.status(400).json({ 'erreur': 'Nom de l\'image invalide' })
        };
    }

    models.Post.findOne({ where: { id: postId } })
        .then(post => {
            if(post.imageContent){
                const photoName = post.imageContent.split('/images/')[1];
                fs.unlink(`images/${photoName}`, (error) => {
                    if(error){
                        console.log("Echec de suppression de l'image : " + error);
                    } else {
                        console.log("Image supprimée avec succès !");
                    };
                });
            }

            post.update({
                textContent: textContent ? textContent : "",
                imageContent: imageContent ? imageContent : null
            })
                .then(postUpdated => res.status(200).json(postUpdated))
                .catch(() => res.status(500).json({ 'erreur': 'Impossible de mettre à jour le post' }))
        })
        .catch(() => res.status(500).json({ 'erreur': 'Impossible de mettre à jour le post' }))
}


// Suppression d'un post
exports.deletePost = (req, res, next) => {
    const postId = req.params.id;
    
    models.Post.findOne({ where: { id: postId } })
        .then(post => {
            if(post.dataValues.imageContent){
                const postPhotoName = post.dataValues.imageContent.split('/images/')[1];
                fs.unlink(`images/${postPhotoName}`, (error) => {
                    if(error){
                        console.log("Echec de suppression de l'image : " + error);
                    } else {
                        console.log("Image supprimée avec succès !");
                    };
                })
            }
            models.Post.destroy({ where: { id: postId } })
                .then(() => res.status(200).json({ message: "Publication supprimée !" }))
                .catch(err => res.status(500).json({ err }))
            

        }).catch(() => res.status(400).json({ "erreur": "Publication introuvable !" }))
    
}