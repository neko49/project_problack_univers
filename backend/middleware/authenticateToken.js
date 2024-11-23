const jwt = require('jsonwebtoken');

module.exports = function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token is missing' }); // Unauthorized
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        console.log('token: ', token)
        if (err) {
            console.error('Token verification failed:', err.message);
            return res.status(403).json({ message: 'Invalid or expired token' }); // Forbidden
        }
        console.log('Authenticated user:', user);
        req.user = user; // Inclure les données de l'utilisateur dans la requête
        next();
    });
};
