const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');

const jwtKey = process.env.JWT_SECRET;

module.exports.authMid = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).json({ error: 'Token missing' });

    const token = authHeader
    if (!token) return res.status(401).json({ error: 'Token missing' });

    try {
        const decoded = jwt.verify(token, jwtKey);
        const userId = new mongoose.Types.ObjectId(decoded._id) // to checkk
        req.userId = decoded.id;
        // req.userId = userId.id;
        next()
    } catch (err) {
        // console.log(`erroe`)
        return res.status(401).json({ error: 'Invalid token' });
    }


}