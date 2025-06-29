import { Prisma } from '@prisma/client';
import { Response } from 'express';

import { ApiError } from './ApiError';

export const errorConverter = (err: any): ApiError => {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        const message = err.message || 'Database error';
        return new ApiError(400, message);
    }

    if (err instanceof ApiError) return err;

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    return new ApiError(statusCode, message, false, err.stack);
};

export const errorResponder = (err: ApiError, res: Response) => {
    const response = {
        status: 'error',
        message: err.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    };

    res.status(err.statusCode).json(response);
};
