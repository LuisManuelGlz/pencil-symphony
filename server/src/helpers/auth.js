const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const helpers = {};

// función para verificar si el usuario está autenticado
helpers.isAuthenticated = async (req, res, next) => {
    let token = req.headers['x-access-token']/*.split(' ')[1]*/;
    // const token = req.headers['x-access-token'];
    
    if (!token) {
        return res.status(401).json({ errors: [{ msg: 'No authorized' }] });
    }
    try {
        token = token.split(' ')[1];
        const decoded = await jwt.verify(token, secret);
        req.userId = decoded.id;
        req.userEmail = decoded.email;
        next();
    } catch (error) {
        return res.status(401).json({ errors: [{ msg: 'Failed authentication' }] });
    }
};

// exportamos los helpers
module.exports = helpers;