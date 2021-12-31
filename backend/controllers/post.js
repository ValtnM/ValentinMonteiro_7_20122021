const jwtUtils = require('../utils/jwt.utils.js');
const models = require('../models');



exports.createPost = (req, res, next) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);
    const textContent = req.body.textContent;    
    let imageContent = req.file

    console.log(textContent);
    console.log(imageContent);

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
    

    console.log("IMAGE : "+imageContent);

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

exports.getAllPost = (req, res, next) => {
    const fields = req.query.fields;
    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.offset);
    const order = req.query.order;

    models.Post.findAll({
        order: [(order != null) ? order.split(':') : ['textContent', 'ASC']],
        attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
        limit: (!isNaN(limit)) ? limit : null,
        offset: (!isNaN(offset)) ? offset : null,
        include: [{
            model: models.User,
            attributes: ['firstname', 'lastname', 'photo']
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