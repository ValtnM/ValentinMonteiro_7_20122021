// Importation des modules
const jwtUtils = require('../utils/jwt.utils.js');

// Importation des models
const models = require('../models');

// Récupération des commentaires d'un post
exports.getAllComments = (req, res, next) => {
    const postId = req.params.postId;
    // console.log(postId);

    models.Comment.findAll({
         where: {
              postId: postId 
        },
        include: [{
                model: models.User,
                attributes: ['id','firstname', 'lastname', 'photo']
        }]
    })
        .then(comments => res.status(200).json(comments))
        .catch(() => res.status(400).json({ error: "Commentaire non trouvé !" }))
}


// Création d'un commentaire
exports.createComment = (req, res , next) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);
    const postId = req.params.postId;
    const text = req.body.text;

    if(!text) {
        res.status(400).json({ message: "Champs vide" })
    } else {
        models.Comment.create({
            userId: userId,
            postId: postId,
            text: text,
            include: [{
                model: models.User,
                // attributes: ['id','firstname', 'lastname', 'photo']
            }]
        })
            .then(comment => res.status(201).json(comment))
            .catch(() => res.status(500).json({ error: "Impossible de créer le commentaire !" }))
    }


}


exports.deleteComment = (req, res, next) => {
    const commentId = req.params.commentId;

    models.Comment.destroy({ where: { id: commentId } })
        .then(() => res.status(200).json({ message: "Le commentaire a été supprimé !" }))
        .catch(() => res.status(400).json({ error: "La suppression du commentaire a échoué !" }))
}