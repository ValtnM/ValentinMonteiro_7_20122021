// Importation des modules
const jwtUtils = require('../utils/jwt.utils.js');

// Importation des models
const models = require('../models');


// Création d'un like et modification de la valeur des likes sur le post
exports.likePost = (req, res, next) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);
    const postId = parseInt(req.params.postId);

    if(postId <= 0){
        res.status(400).json({ error: 'Paramètres invalides !' })
    }

    models.Like.findOne({
        where: {
            userId: userId,
            postId: postId
        }
    })
        .then(like => {
            if(!like) {
                models.Like.create({
                    userId: userId,
                    postId: postId
                })
                    .then(() => {
                        models.Post.findOne({ where: { id: postId } })
                            .then(post => {
                                post.update({
                                    like: req.body.like + 1 
                                })
                                    .then(likeNb => res.status(200).json(likeNb))
                                    .catch(() => res.status(500).json({ error: "Echec de l'incrémentation des likes !" }))
                            })
                            .catch(() => res.status(400).json({ error: "Post non trouvé !" }))
                    })
                    .catch(() => res.status(500).json({ error: "Echec de l'ajout du like !" }))
            } else {
                like.destroy()
                    .then(() => {
                        models.Post.findOne({where: { id: postId } })
                            .then(post => {
                                post.update({
                                    like: req.body.like - 1
                                })
                                    .then(likeNb => res.status(200).json(likeNb))
                                    .catch(() => res.status(500).json({ error: "Echec de la décrémentation des likes !" }))
                        .catch(() => res.status(400).json({ error: "Post non trouvé !" }))
                            })
                    })
            }
        })
        .catch(() => res.status(500).json({ error: "Like non trouvé !" }))
}


// Vérification de l'existence d'un like par l'utilisateur authentifié sur un post
exports.getOnePostLike = (req, res, next) => {    
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);
    const postId = req.params.postId;

    models.Like.findOne({
        where: {
            userId: userId,
            postId: postId
        }
    })
        .then(like => {
            if(like){
                res.status(200).json({ message: true })
            } else {
                res.status(200).json({ message: false })
            }
        })
        .catch(() => res.status(400).json({ error: "Like non trouvé !" }))
}