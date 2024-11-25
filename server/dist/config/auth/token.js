import jwt from 'jsonwebtoken';
import { COOKIE_NAME } from '../../utils/constants.js';
export const createToken = (id, email, expiresIn) => {
    const payload = { id, email };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};
export const verifyToken = (req, res, next) => {
    try {
        const token = req.signedCookies[`${COOKIE_NAME}`];
        if (!token || token.trim() === '') {
            return res.status(401).json({ message: 'Token Not Received' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Set the decoded token data to res.locals
        res.locals.jwtData = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({
            message: 'Token Expired or Invalid',
            error: err instanceof Error ? err.message : 'Unknown error'
        });
    }
};
//# sourceMappingURL=token.js.map