// JWT middleware
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateUser = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({message: "Access denied. No token provided!"});
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token"});
    }
}
