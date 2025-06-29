import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'trackonomy_secret';
const JWT_EXPIRES_IN = '3d'; // 72 hours

export const generateToken = (payload: { id: number; name: string }) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET) as { id: number; name: string; iat: number; exp: number };
};
