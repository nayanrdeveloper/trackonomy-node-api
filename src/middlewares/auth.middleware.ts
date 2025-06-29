import { Request, Response, NextFunction } from 'express';

import { verifyToken } from '../utils/auth.util';
import { ApiError } from '../errors/ApiError';

export interface AuthenticatedRequest extends Request {
    user?: {
        id: number;
        name: string;
    };
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new ApiError(401, 'Authorization header is missing or invalid'));
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyToken(token);
        req.user = { id: decoded.id, name: decoded.name };
        next();
    } catch (err) {
        return next(new ApiError(401, 'Invalid or expired token'));
    }
};
