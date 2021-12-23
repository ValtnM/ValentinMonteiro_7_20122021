const express = require('express');
const app = express();
const mysql = require('mysql')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Connexion à la base de données
const db = mysql.createConnection({
    host: 'localhost',
    database: 'groupomania',
    user: 'root',
    password: ''
})

db.connect((err) => {
    if(err) {
        console.log(err.message);
    } else {
        console.log('Connected !');

        app.get('/api/user', (req, res, next) => {
            db.query('SELECT * FROM users', (err, result) => {
                if (err) {
                    res.json({error});
                } else {
                    res.status(200).json(result)
                }
            })
        });
        
        app.get('/api/user/:id', (req, res, next) => {
            db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, result) => {
                if (err) {
                    console.log({ err });
                } else {

                    if (result[0] != undefined) {
                        res.status(200).json(result)
                    } else {
                        res.status(404).json({ err: 'Invalid ID !'})
                    }
                }
            })
        });

        app.post('/api/user', (req, res, next) => {
            
            db.query('INSERT INTO users(email, password, firstname, lastname, photo) VALUES (?,?,?,?,?)', [req.body.email, req.body.password, req.body.firstname, req.body.lastname, req.body.photo], (err, result) => {
                if (err) {
                    res.status(300).json({ err });
                } else {
                    db.query('SELECT * FROM users WHERE email = ?', [req.body.email], (err, result) => {
                        if(err) {
                            res.status(404).json({err})
                        } else {
                            res.status(201).json({
                                id: result[0].id,
                                email: result[0].email,
                                password: result[0].password,
                                firstname: result[0].firstname,
                                lastname: result[0].lastname,
                                photo: result[0].photo
                            })                            
                        }
                    })
                }
            })
        });
        
        app.listen(3000);
    }
})




// app.post('/api/user', (req, res, next) => {
//     res.status(201).json({
//         message: 'Utilisateur créé !'
//     })
// })




module.exports = app;