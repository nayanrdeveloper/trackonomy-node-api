import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

import { ApiError } from '../errors/ApiError';

const validate = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            const messages = error.errors.map((e) => e.message);
            // 👇 send first or all messages (your choice)
            next(new ApiError(400, messages.join(', ')));
            // OR if you want to send all messages as array:
            // next(new ApiError(400, messages));
        } else {
            next(error);
        }
    }
};

export default validate;
