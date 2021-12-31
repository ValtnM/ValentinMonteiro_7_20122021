const jwt = require('jsonwebtoken');

module.exports = {
    generateTokenForUser: (userData) => {
        return jwt.sign(
        {
            userId: userData.id,
            isAdmin: userData.isAdmin
        }, 
        'SECRET_KEY_TOKEN',
        { expiresIn: '4h' }        
        )
    },
    parseAuthorization: (authorization) => {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
        
    },
    getUserId: (authorization) => {
        let userId = -1;
        const token = module.exports.parseAuthorization(authorization);
        
        if(token != null) {
            try {
                const jwtToken = jwt.verify(token, 'SECRET_KEY_TOKEN');
                if(jwtToken != null) {
                    userId = jwtToken.userId;
                }
            } catch (err) { 
                console.log(err);
            }
        }
        return userId;
    }
}