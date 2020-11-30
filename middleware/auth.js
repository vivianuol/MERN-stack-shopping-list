const config = require('config');
const jwt = require('jsonwebtoken');

function auth (req, res, next) {
    const token = req.header('x-auth-token');

    // check token
    if (!token) return res.status(401).json({ msg: 'Token is empty, authorization denied.'})
    
    try {
        // Verify token
        const decoded = jwt.verify(token, 'cao');
        // Add user from payload
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ msg: 'Token is not valid.'})
    }
    
}

module.exports = auth;