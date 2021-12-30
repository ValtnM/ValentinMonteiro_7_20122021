const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');

const models = require('../models')

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*\d).{4,8}$/;



exports.signup = (req, res, next) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const photo = req.body.photo;

    if(email == null || password == null || firstname == null || lastname == null) {
        return res.status(400).json({ 'erreur': 'paramètres manquants' });
    } 
    if (firstname.length > 20 || firstname.length < 2) {
        return res.status(400).json({ 'erreur': 'prénom invalide (doit être entre 2 et 20 caractères)' })
    } 
    if (lastname.length > 20 || lastname.length < 2) {
        return res.status(400).json({ 'erreur': 'nom invalide (doit être entre 2 et 20 caractères)' })
    } 
    if(!emailRegex.test(email)) {
        return res.status(400).json({ 'erreur': 'email invalide' })
    } 
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ 'erreur': 'mot de passe invalide (doit contenir entre 4 et 8 caractères et au moins un chiffre)'})
    }

    models.User.findOne({
        attributes: ['email'],
        where: { email: email }
    })
    .then(user => {
        if(!user) {

            bcrypt.hash(password, 10)
                .then(hash => {
                    const newUser = models.User.create({
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
                    .catch(err => {
                        return res.status(500).json({ err })
                    })
                })

        } else {
            return res.status(409).json({ 'error': 'user already exist' });
        }
    })
    .catch(err => {
        return res.status(500).json({ err });
    })


            
    // db.query('INSERT INTO users(email, password, firstname, lastname, photo) VALUES (?,?,?,?,?)', [req.body.email, req.body.password, req.body.firstname, req.body.lastname, req.body.photo], (err, result) => {
    //     if (err) {
    //         res.status(300).json({ err });
    //     } else {
    //         db.query('SELECT * FROM users WHERE email = ?', [req.body.email], (err, result) => {
    //             if(err) {
    //                 res.status(404).json({err})
    //             } else {
    //                 res.status(201).json({
    //                     id: result[0].id,
    //                     email: result[0].email,
    //                     password: result[0].password,
    //                     firstname: result[0].firstname,
    //                     lastname: result[0].lastname,
    //                     photo: result[0].photo
    //                 })                            
    //             }
    //         })
    //     }
    // })
};


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

exports.getOneUser = (req, res, next) => {
    const userId = req.params.id;
    models.User.findOne({
        attributes: [ 'id', 'email', 'firstname', 'lastname', 'photo' ],
        where: { id: userId }
    }).then((user) => {
        if(user){
            res.status(200).json(user);
        } else {
            res.status(404).json({ 'erreur': 'Utilisateur non trouvé !'})
        }
    }).catch(err => res.status(500).json({err}))
}


// exports.getOneUser = (req, res, next) => {
   
//     const headerAuth = req.headers['authorization'];
//     const userId = jwtUtils.getUserId(headerAuth);
//     if(userId < 0) {
//         console.log(`id est égal à : ${userId}`);

//         return res.status(400).json({ 'erreur': 'Token incorrect' });
//     }
//     models.User.findOne({
//         attributes: [ 'id', 'email', 'firstname', 'lastname', 'photo' ],
//         where: { id: userId }
//     })
//         .then((user) => {
//             if(user) {
//                 res.status(201).json(user);
//             } else {
//                 res.status(404).json({ 'erreur': 'Utilisateur introuvable'})
//             }
//         })
//         .catch((err) => {
//             res.status(500).json({ err })
//         });
// };

exports.updateUser = (req, res, next) => {
    const headerAuth = req.headers['authorization'];
    console.log(req.header);
    let userId = jwtUtils.getUserId(headerAuth);

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const photo = req.body.photo;

    models.User.findOne({
        attributes: ['id', 'firstname', 'lastname', 'photo'],
        where: { id: userId }
    })
        .then(user => {
            if(user) {
                user.update({
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


exports.getAllUsers = (req, res, next) => {
    db.query('SELECT * FROM users', (err, result) => {
        if (err) {
            res.json({error});
        } else {
            res.status(200).json(result);
        }
    })
};

// exports.getOneUser = (req, res, next) => {
//     db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, result) => {
//         if (err) {
//             console.log({ error });
//         } else {
//             res.status(200).json(result);
//         }
//     })
// };
