
exports.getAllUsers = (req, res, next) => {
    db.query('SELECT * FROM users', (err, result) => {
        if (err) {
            res.json({error});
        } else {
            res.status(200).json(result);
        }
    })
};

exports.getOneUser = (req, res, next) => {
    db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, result) => {
        if (err) {
            console.log({ error });
        } else {
            res.status(200).json(result);
        }
    })
};

exports.createUser = (req, res, next) => {
            
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
};